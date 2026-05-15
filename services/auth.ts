import { apiRequest } from '@/libs/api';
import type { AuthUser } from '@/store/entities';

import { homeApiPath } from './paths';

export type LoginBody = {
    email: string;
    password: string;
};

export type RegisterBody = LoginBody & {
    name?: string;
};

/** Typical auth response — align paths/shape with your backend. */
export type AuthSessionResponse = {
    user: AuthUser;
    accessToken: string;
};

export function login(body: LoginBody) {
    return apiRequest<AuthSessionResponse>(homeApiPath('login'), {
        method: 'POST',
        json: body,
    });
}

export function register(body: RegisterBody) {
    return apiRequest<AuthSessionResponse>(homeApiPath('register'), {
        method: 'POST',
        json: body,
    });
}

export function fetchCurrentUser(accessToken: string) {
    return apiRequest<AuthUser>(homeApiPath('me'), { token: accessToken });
}
