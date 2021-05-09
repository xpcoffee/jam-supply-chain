export interface Product {
    id?: string;
    name?: string;
    price?: number;
    quantity?: number;
}

export interface ExistingProduct extends Product {
    id: string;
}

export type ListResponse<T> = { bundle: T[] };
