import type { CategoryInterface } from "../interface/category";
import type { ProductInterface } from "../interface/product";
import { getLocalCategories } from "../helper/category";
import { getLocalProducts } from "../helper/product";
import {
    CategoryAction,
    categoryReducer,
    ProductAction,
    productReducer,
    type ActionType,
} from "./reducers";
import {
    type ActionDispatch,
    type ReactNode,
    createContext,
    useContext,
    useReducer,
    type FC,
} from "react";

interface CategoryContext {
    categories: CategoryInterface[];
    dispatch: ActionDispatch<[ action: ActionType<CategoryAction> ]>;
}
const Categories = createContext<CategoryContext>({
    categories: getLocalCategories(),
    dispatch: () => { }
});

interface ProductContext {
    products: ProductInterface[];
    dispatch: ActionDispatch<[ action: ActionType<ProductAction> ]>;
}
const Products = createContext<ProductContext>({
    products: getLocalProducts(),
    dispatch: () => { }
});

export const useCategories = () => useContext(Categories);
export const useProducts = () => useContext(Products);

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    const [ products, productDispatch ] = useReducer(productReducer, getLocalProducts());
    const [ categories, categoryDispatch ] = useReducer(categoryReducer, getLocalCategories());
    return (
        <Categories.Provider value={{ categories, dispatch: categoryDispatch }}>
            <Products.Provider value={{ products, dispatch: productDispatch }}>
                {children}
            </Products.Provider>
        </Categories.Provider>
    );
};

export default Provider;
