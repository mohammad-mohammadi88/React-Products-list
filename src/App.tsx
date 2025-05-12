import ShowProducts from "./Components/ShowProducts";
import AddCategory from "./Components/AddCategory";
import AddProduct from "./Components/AddProduct";
import { useProducts } from "./Context/Provider";
import { useState, type FC } from "react";
import Filter from "./Components/Filter";
import Navbar from "./Components/Navbar";

const App: FC = () => {
    const {dispatch} = useProducts();
    const [forceReFilter, setForceReFilter] = useState<boolean>(false)
    const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
    return (
        <>
            <Navbar />
            <main className='lg:max-w-screen-xl px-4 flex flex-wrap container mx-auto'>
                <div className="w-full md:w-1/2 px-6">
                    {!showAddCategory && (
                        <button
                        onClick={() => setShowAddCategory(true)}
                        className='text-slate-600 mt-4 cursor-pointer'
                        >
                            Add New Category?
                        </button>
                    )}
                    {showAddCategory && (
                        <AddCategory setShowAddCategory={setShowAddCategory} />
                    )}
                    <AddProduct setForceReFilter={setForceReFilter}/>
                </div>
                <div className="w-full md:w-1/2 px-6">
                    <Filter dispatch={dispatch} forceReFilter={forceReFilter}/>
                    <ShowProducts />
                </div>
            </main>
        </>
    );
};

export default App;
