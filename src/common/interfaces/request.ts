export interface PaginationParams {
    page?: number;
    limit?: number;
    all?: string
}

export interface ArticlePaginationParams {
    page?: string;
    limit?: string;
    all?: string;
    tags?: string;
}
