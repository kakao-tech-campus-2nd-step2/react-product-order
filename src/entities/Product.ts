export interface ProductData {
    id: number;
    name: string;
    imageURL: string;
    wish: {
        wishCount: number;
        isWished: boolean;
    }
    price: {
        basicPrice: number;
        discountRate: number;
        sellingPrice: number;
    }
    brandInfo: {
        id: number;
        name: string;
        imageURL: string;
    }
}
interface ProductDetail extends ProductData {
    isAccessableProductPage: boolean;
    review: {
        averageRating: number;
        totalReviewCount: number;
    }
    productDescription: {
        images: string[];
    }
    productDetailInfo: {
        announcements: {
            displayOrder: number;
            name: string;
            value: string;
        }[]
        terms: {
            displayOrder: number;
            title: string;
            description: string;
        }[]
    }
}
export interface ProductDetailData {
    detail: ProductDetail;
}

export interface RankedProducts {
    products: ProductData[];
}

export interface Products {
    products: ProductData[];
    nextPageToken: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    }
}