export interface Product {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
}

export interface ProductListProps {
    products: Product[];
    onBuy: (productId: string) => void;
}

export interface ProductCardProps {
    product: {
        id: string;
        title: string;
        imageUrl: string;
        description: string;
        price: number;
    };
    onBuy: (productId: string) => void;

}