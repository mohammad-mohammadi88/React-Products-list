import { getLocalProducts, setLocalProducts } from "../helper/product";
import type { CategoryInterface } from "../interface/category";
import type { ProductInterface } from "../interface/product";
import { setLocalCategory } from "../helper/category";
import { v4, type UUIDTypes } from "uuid";

export interface ActionType<T> {
    type: T;
    payload?: any;
}

// Products
export enum ProductAction {
    deleteProduct = "products/deleteProduct",
    getProducts = "products/getProducts",
    addProducts = "products/addProducts",
    editProduct = "products/editProduct",
    sortProducts = "sort/sortProducts",
}
export const productReducer = (
    state: ProductInterface[],
    action: ActionType<ProductAction>
) => {
    const localProducts = getLocalProducts();
    switch (action.type) {
        case ProductAction.getProducts: {
            return state;
        }

        case ProductAction.addProducts: {
            const newProduct = {
                ...action.payload,
                id: v4(),
                createdAt: Date.now(),
            };
            const States: ProductInterface[][] = [state, localProducts].map(
                (products) => [newProduct, ...products]
            );
            setLocalProducts(States[1]);
            return States[0];
        }

        case ProductAction.deleteProduct: {
            const States: ProductInterface[][] = [state, localProducts].map(
                (products) => products.filter(({ id }) => id !== action.payload)
            );
            setLocalProducts(States[1]);
            return States[0];
        }

        case ProductAction.editProduct: {
            const States: ProductInterface[][] = [state, localProducts].map(
                (products:any[]) => {
                    const productIndex = products.findIndex(
                        ({ id }) => id === action.payload.id
                    );
                    Object.keys(action.payload).forEach((item:any) => {
                        products[productIndex][item] =
                        action.payload[item];
                    })
                    return products;
                }
            );
            setLocalProducts(States[1]);
            return States[0];
        }

        case ProductAction.sortProducts: {
            const {
                sortTitle,
                sortCategoryId,
                sortTime = "latest",
            } = action.payload;
            const titleCheck = (title: string) =>
                sortTitle.length > 0 ? title.includes(sortTitle) : true;

            const categoryCheck = (categoryId: UUIDTypes) =>
                sortCategoryId.length > 0
                    ? categoryId === sortCategoryId
                    : true;

            const products = localProducts
                .filter(
                    ({ title, categoryId }) =>
                        titleCheck(title) && categoryCheck(categoryId)
                )
                .sort(({ createdAt: a }, { createdAt: b }) =>
                    sortTime === "latest" ? b - a : a - b
                );
            return products;
        }

        default:
            return state;
    }
};

interface AddProductInterface {
    title: string;
    categoryId: UUIDTypes;
    quantity: number;
}
export type TimeType = "latest" | "earliest";
interface SortProductsInterface {
    sortTitle?: string;
    sortCategoryId?: string;
    sortTime?: TimeType;
}
export const getProducts = () => ({ type: ProductAction.getProducts });
export const addProduct = (payload: AddProductInterface) => ({
    type: ProductAction.addProducts,
    payload,
});
export const deleteProduct = (payload: UUIDTypes) => ({
    type: ProductAction.deleteProduct,
    payload,
});
interface EditProductInterface{
    id:UUIDTypes;
    title?:string;
    categoryId?:UUIDTypes,
    quantity?:number
}
export const editProduct = (payload:EditProductInterface) => ({
    type: ProductAction.editProduct,
    payload,
});

export const sortProducts = (payload: SortProductsInterface) => ({
    type: ProductAction.sortProducts,
    payload,
});

// Categories
export enum CategoryAction {
    getCatogeries = "category/getCatogeries",
    addCatogeries = "category/addCatogeries",
}
export const categoryReducer = (
    state: CategoryInterface[],
    action: ActionType<CategoryAction>
) => {
    switch (action.type) {
        case CategoryAction.getCatogeries:
            return state;

        case CategoryAction.addCatogeries: {
            const newCategories = [
                ...state,
                {
                    ...action.payload,
                    categoryId: v4(),
                },
            ];
            setLocalCategory(newCategories);
            return newCategories;
        }

        default:
            return state;
    }
};

interface AddCategoryInterface {
    title: string;
    description: string;
}
export const getCatogeries = () => ({ type: CategoryAction.getCatogeries });
export const addCatogery = (payload: AddCategoryInterface) => ({
    type: CategoryAction.addCatogeries,
    payload,
});
