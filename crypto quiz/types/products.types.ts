export interface Product {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
}

export interface ProductListProps {
    products: Product[];
}

export interface ProductCardProps {
    product: {
        id: number;
        title: string;
        imageUrl: string;
        description: string;
        price: number;
    };
    onAddToCart: (productId: number) => void;
}