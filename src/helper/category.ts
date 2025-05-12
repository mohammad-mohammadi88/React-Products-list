import type { CategoryInterface } from "../interface/category";

export const getLocalCategories = (): CategoryInterface[] =>
    JSON.parse(localStorage.getItem("categories") ?? "[]");
export const setLocalCategory = (categories: CategoryInterface[]): void =>
    localStorage.setItem("categories", JSON.stringify(categories));
