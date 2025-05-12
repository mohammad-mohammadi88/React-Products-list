import { useCategories, useProducts } from "../../Context/Provider";
import { useState, type Dispatch, type FC, type FormEvent, type SetStateAction } from "react";
import { addProduct } from "../../Context/reducers";
import Select from "../../contracts/Select";
import Input from "../../contracts/Input";
import Form from "../../contracts/Form";

interface Props{
    setForceReFilter:Dispatch<SetStateAction<boolean>>
}
const AddProduct: FC<Props> = ({setForceReFilter}) => {
    const [ productTitle, setProductTitle ] = useState<string>("");
    const [ productQuantity, setProductQuantity ] = useState<number>(0);
    const [ productCategoryId, setProductCategoryId ] = useState<string>("");
    const { categories } = useCategories();
    const { dispatch } = useProducts();
    const options = categories.map(({ categoryId, title: name }) => ({
        value: categoryId,
        name,
    }));
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(
            addProduct({
                title: productTitle,
                quantity: productQuantity,
                categoryId: productCategoryId,
            })
        );
        setForceReFilter(c=>!c)
        setProductTitle("");
        setProductQuantity(0);
        setProductCategoryId("")
    };
    return (
        <Form formName='Add New Product' handleSubmit={handleSubmit}>
            <Input
                handleChange={setProductTitle}
                value={productTitle}
                className="w-full"
                id='productTitle'
                label='Title'
            />

            <Input
                handleChange={setProductQuantity}
                value={productQuantity}
                id='productQuantity'
                className="w-full"
                label='Quantity'
                pattern='[0,9]'
                type='number'
                min='1'
            />


            <Select
                handleChange={setProductCategoryId}
                defaultOption="select an Category"
                value={productCategoryId}
                id='productCategory'
                className="w-full"
                options={options}
                label='Category'
            />

            <div className='flex gap-x-4 mt-3'>
                <button className='w-full p-2 text-white rounded-xl bg-slate-500'>
                    Add New Product
                </button>
            </div>
        </Form>
    );
};

export default AddProduct;
