import { memo, useEffect, useState, type Dispatch, type FC, type SetStateAction } from "react";
import type { CategoryInterface } from "../../interface/category";
import type { ProductInterface } from "../../interface/product";
import { deleteProduct, editProduct } from "../../Context/reducers";
import { useProducts } from "../../Context/Provider";
import Select from "../../contracts/Select";
import type { UUIDTypes } from "uuid";

interface Props {
    allCategories: CategoryInterface[],
    setForceProductUpdate: Dispatch<SetStateAction<boolean>>
}
const Product: FC<Props & ProductInterface> = ({ setForceProductUpdate, title, allCategories, categoryId, createdAt, id, quantity }) => {
    const [ canEditTitle, setCanEditTitle ] = useState<boolean>(false)
    const [ editTitle, setEditTitle ] = useState<string>(title);
    const [canEdit, setCanEdit] = useState<boolean>(false)
    const categoryName = allCategories.find(
        (categoryObj) => categoryObj.categoryId === categoryId
    )?.title;
    const [ canEditCategoryId, setCanEditCategoryId ] = useState<boolean>(false)
    const [ editCategoryId, setEditCategoryId ] = useState<any>(categoryId)
    const date = new Date(createdAt)
    const { dispatch } = useProducts()
    const handleDelete = () => {
        dispatch(deleteProduct(id));
    }
    const options = allCategories.map(({ categoryId, title: name }) => ({
        value: categoryId,
        name
    }))

    useEffect(() => {
        dispatch(editProduct({ id, title: editTitle, categoryId: editCategoryId }))
        setForceProductUpdate(c => !c)
    }, [ editCategoryId,setCanEditCategoryId,canEdit ])
    const handleEditTitle = () => {
        setCanEditTitle(false);
        setCanEdit(c=>!c)
    }
    return (
        <div className='flex items-center py-2 border-b border-b-slate-600 justify-between  w-full min-w-[300px]'>
            <span className='text-slate-400 truncate cursor-pointer' title={title} onClick={() => setCanEditTitle(true)}>
                {canEditTitle ?
                    (<input
                        className="border px-2 py-0.5 focus-visible:border-blue-500 focus-visible:outline-0 rounded-xl"
                        onChange={(e) => setEditTitle(e.target.value)}
                        value={editTitle}
                        type="text"
                    />) : title}
            </span>
            <div className='flex items-center gap-x-3'>
                {canEditTitle ?
                    <button className="bg-slate-600 text-white cursor-pointer hover:bg-slate-500 duration-300 px-2 py-1 rounded-md" onClick={handleEditTitle}>edit</button>
                    : <>
                        <div className='text-slate-400'>{date.toLocaleDateString()}</div>
                        {canEditCategoryId ? <Select
                            handleChange={(newCategoryId:UUIDTypes)=>{
                                setCanEditCategoryId(false)
                                setEditCategoryId(newCategoryId)
                            }}
                            id="selectEditCategory"
                            value={editCategoryId}
                            className="py-0 px-1"
                            options={[
                                ...options,
                                {name:"Cancel",value:categoryId},
                            ]}
                        /> : <span onClick={() => setCanEditCategoryId(true)} className='block md:hidden lg:block px-3 py-0.5 text-slate-400 border truncate border-slate-400 text-sm rounded-2xl '>
                            {categoryName}
                        </span>}
                        <span className='hidden sm:flex md:hidden lg:flex items-center justify-center w-9 h-7 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300'>
                            {quantity > 99 ? "99+" : quantity}
                        </span>
                        <button onClick={handleDelete} className='border px-2 py-0.5 rounded-2xl border-red-400 text-red-400 delete-product'>
                            delete
                        </button>
                    </>}
            </div>
        </div>
    );
};

export default memo(Product,(prevPops,nextProps)=>{
    return prevPops.categoryId === nextProps.categoryId && prevPops.title === nextProps.title
});
