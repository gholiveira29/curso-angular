import { Department } from './department';
export interface Product {
    name: string,
    department: Department[] | string[];
    stock: number,
    price: number,
    _id?: string
}
