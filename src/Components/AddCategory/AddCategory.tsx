import { useCategories } from "../../Context/Provider";
import { addCatogery } from "../../Context/reducers";
import Textaria from "../../contracts/Textaria";
import Input from "../../contracts/Input";
import Form from "../../contracts/Form";
import {
    type SetStateAction,
    type FormEvent,
    type Dispatch,
    useState,
    type FC,
} from "react";

interface Props {
    setShowAddCategory: Dispatch<SetStateAction<boolean>>;
}

const AddCategory: FC<Props> = ({ setShowAddCategory }) => {
    const [categoryTitle, setCategoryTitle] = useState<string>("");
    const [categoryDescription, setCategoryDescription] = useState<string>("");
    const {dispatch} = useCategories()
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(addCatogery({
            title: categoryTitle,
            description: categoryDescription
        }))
        setShowAddCategory(false);
    };
    return (
        <Form formName='Add New Category' handleSubmit={handleSubmit}>
            <Input
                handleChange={setCategoryTitle}
                value={categoryTitle}
                id='categoryTitle'
                className="w-full"
                label='Title'
            />
            <Textaria
                handleChange={setCategoryDescription}
                value={categoryDescription}
                id='categoryDescription'
                label='Description'
            />
            <div className='flex gap-x-4 mt-3'>
                <button
                    className='w-full p-2 border border-slate-400 text-slate-400 rounded-xl'
                    onClick={() => setShowAddCategory(false)}
                >
                    Cencel
                </button>
                <button className='w-full p-2 text-white rounded-xl bg-slate-500'>
                    Add Category
                </button>
            </div>
        </Form>
    );
};

export default AddCategory;
