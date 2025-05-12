import type { UUIDTypes } from "uuid";

export interface ProductInterface{
    title:string,
    categoryId:UUIDTypes,
    quantity:number,
    createdAt:number,
    id:UUIDTypes
}