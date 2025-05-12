import type { ProductInterface } from "../interface/product";

export const getLocalProducts = (): ProductInterface[] =>
    JSON.parse(localStorage.getItem("products") || "[]");
export const setLocalProducts = (products: ProductInterface[]): void =>
    localStorage.setItem("products", JSON.stringify(products));
