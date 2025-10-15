export interface CreateProductRequestBody {
    name: string;
    price: number;
    category?: string;
    userId: number;
}

export interface UpdateProductRequestBody {
    name?: string;
    price?: number;
    category?: string;
}
