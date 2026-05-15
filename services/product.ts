import { apiRequest } from '@/libs/api';
import type { Product } from '@/store/entities';

import { homeApiPath } from './paths';

export type ProductListQuery = {
    categoryId?: string;
    limit?: number;
    offset?: number;
};

function toSearchParams(query?: ProductListQuery): string {
    if (!query) return '';
    const q = new URLSearchParams();
    if (query.categoryId) q.set('categoryId', query.categoryId);
    if (query.limit != null) q.set('limit', String(query.limit));
    if (query.offset != null) q.set('offset', String(query.offset));
    const s = q.toString();
    return s ? `?${s}` : '';
}

export function fetchProducts(query?: ProductListQuery, accessToken?: string | null) {
    return apiRequest<Product[]>(`${homeApiPath('products')}${toSearchParams(query)}`, {
        token: accessToken ?? undefined,
    });
}

export function fetchProductById(productId: string, accessToken?: string | null) {
    return apiRequest<Product>(homeApiPath('products', encodeURIComponent(productId)), {
        token: accessToken ?? undefined,
    });
}
