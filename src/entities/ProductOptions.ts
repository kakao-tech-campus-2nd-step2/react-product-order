interface ProductOption {
    key: string;
    value: string;
    level: number;
    options: ProductOption[];
    id: number;
    usable: boolean;
    price: number;
    stockQuantity: number;
    unlimitedStockQuantity: boolean;
}
export interface ProductOptions {
    options: {
        productId: number;
        productName: string;
        productPrice: number;
        hasOption: boolean;
        giftOrderLimit: number;
        names: string[];
        options: ProductOption[];
    }
}