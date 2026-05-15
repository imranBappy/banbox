/**
 * All service routes are under `/home/...` until the API is split by domain.
 * @example homeApiPath() → `/home`
 * @example homeApiPath('login') → `/home/login`
 * @example homeApiPath('products', id) → `/home/products/:id`
 */
export function homeApiPath(...segments: string[]): string {
    const parts = ['home', ...segments]
        .map((s) => String(s).replace(/^\/+|\/+$/g, ''))
        .filter((s) => s.length > 0);
    return `/${parts.join('/')}`;
}
