export interface Products {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}


export interface AddProductToCart {
    id: string;
    product: Products;
    quantity: number;
}