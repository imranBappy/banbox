/** Minimal product shape for lists and persistence; extend when API is wired. */
export type Product = {
    id: string;
    title: string;
    price: number;
    compareAtPrice?: number;
    imageUrl?: string;
    categoryId?: string;
};

export type Category = {
    id: string;
    name: string;
    slug?: string;
    imageUrl?: string;
};

export type Story = {
    id: string;
    title?: string;
    imageUrl?: string;
    productId?: string;
};

export type AuthUser = {
    id: string;
    email: string;
    name?: string;
    avatarUrl?: string;
};
