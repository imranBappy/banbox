import { API_BASE_URL } from '@/constants';

export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly body: unknown,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export type ApiRequestInit = Omit<RequestInit, 'body'> & {
    body?: BodyInit | null;
    /** Sets `Content-Type: application/json` and serializes the body. */
    json?: unknown;
    /** If set, sends `Authorization: Bearer <token>`. */
    token?: string | null;
};

function joinBase(path: string): string {
    const base = API_BASE_URL.replace(/\/$/, '');
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${base}${p}`;
}

async function readSuccessBody<T>(res: Response): Promise<T> {
    const text = await res.text();
    if (!text) {
        return undefined as T;
    }
    const ct = res.headers.get('content-type');
    if (ct?.includes('application/json')) {
        return JSON.parse(text) as T;
    }
    return text as unknown as T;
}

async function readErrorBody(res: Response): Promise<unknown> {
    const text = await res.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

/**
 * Typed `fetch` wrapper against {@link API_BASE_URL}.
 * Throws {@link ApiError} when the response is not ok (4xx/5xx).
 */
export async function apiRequest<T>(path: string, init: ApiRequestInit = {}): Promise<T> {
    const { json, token, headers: initHeaders, body: initBody, ...rest } = init;
    const headers = new Headers(initHeaders);

    let body: BodyInit | undefined = initBody as BodyInit | undefined;
    if (json !== undefined) {
        headers.set('Content-Type', 'application/json');
        body = JSON.stringify(json);
    }
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const res = await fetch(joinBase(path), {
        ...rest,
        headers,
        body,
    });

    if (!res.ok) {
        const body = await readErrorBody(res);
        const message =
            typeof body === 'object' &&
            body !== null &&
            'message' in body &&
            typeof (body as { message: unknown }).message === 'string'
                ? (body as { message: string }).message
                : res.statusText || 'Request failed';
        throw new ApiError(message, res.status, body);
    }

    return readSuccessBody<T>(res);
}
