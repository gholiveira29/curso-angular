import { Department } from './department';
export interface Product {
    name: string,
    department: Department[],
    stock: number,
    price: number,
    _id?: string
}
