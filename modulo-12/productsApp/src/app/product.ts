import { Department } from './department';
export interface Product {
    _id?: string,
    name: string,
    price: number,
    stock: number,
    departments: Department[] | string[]
}
