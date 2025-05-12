import { useCategories, useProducts } from "../../Context/Provider";
import { useState, type FC } from "react";
import Product from "./Product";

const ShowProducts: FC = () => {
    const { products } = useProducts();
    const [_, setForceProductUpdate] = useState<boolean>(false)
    const { categories } = useCategories();
    return (
        <div className="w-full">
            <h1 className='text-xl mb-1 mt-10 w-full text-slate-400 font-bold block border-b-2 pb-1 border-b-slate-400'>
                Products List
            </h1>
            {products.length > 0 ? products.map(({ title, id, categoryId, createdAt, quantity }) => (
                <Product
                    setForceProductUpdate={setForceProductUpdate}
                    allCategories={categories}
                    categoryId={categoryId}
                    createdAt={createdAt}
                    quantity={quantity}
                    title={title}
                    key={String(id)}
                    id={id}
                />
            )) : <h3 className="mt-4 font-bold text-2xl text-white">There is no product!</h3>}
        </div>
    );
};

export default ShowProducts;
