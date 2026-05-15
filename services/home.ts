import { apiRequest } from '@/libs/api';
import type { HomePayload } from '@/types';

import { homeApiPath } from './paths';

export function fetchHome(accessToken?: string | null) {
    return apiRequest<HomePayload>(homeApiPath(), { token: accessToken ?? undefined });
}
