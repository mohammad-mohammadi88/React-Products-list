import { sortProducts, type TimeType } from '../../Context/reducers';
import { useEffect, useState, type Dispatch, type FC } from 'react';
import Select, { type Option } from '../../contracts/Select';
import { useCategories } from '../../Context/Provider';
import Input from '../../contracts/Input';

interface Props {
    dispatch: Dispatch<any>,
    forceReFilter: boolean
}
const Filter: FC<Props> = ({ dispatch, forceReFilter }) => {
    const [ sortTitle, setSortTitle ] = useState<string>("")
    const [ sortTime, setSortTime ] = useState<TimeType>("latest")
    const [ sortCategoryId, setSortCategoryId ] = useState<string>("")
    const handleChange = () => {
        dispatch(sortProducts({ sortTitle, sortCategoryId, sortTime }))
    }
    const { categories } = useCategories();
    const categoryOptions = categories.map(({ categoryId, title: name }) => ({
        value: categoryId,
        name,
    }));
    useEffect(() => {
        handleChange()
    }, [ setSortTime, setSortTitle, sortTime, sortTitle, setSortCategoryId, sortCategoryId, forceReFilter ])
    const sortTimeOptions: Option[] = [
        {
            name: "latest",
            value: "latest",
        },
        {
            name: "earliest",
            value: "earliest",
        },
    ]
    return (
        <div className='w-full'>
            <h1 className='text-xl mb-1 mt-10 w-full md:mt-20 text-slate-400 font-bold block border-b-2 pb-1 border-b-slate-400'>
                Filters
            </h1>
            <form>
                <div className='flex my-4 justify-between'>
                    <Input
                        handleChange={setSortTitle}
                        value={sortTitle}
                        label='Search'
                        id='sortTitle'
                    />
                </div>
                <div className='flex my-4 justify-between'>
                    <Select
                        defaultOption="select a option"
                        handleChange={setSortTime}
                        options={sortTimeOptions}
                        value={sortTime}
                        id='sortTime'
                        label='Sort'
                    />
                </div>
                <div className='flex my-4 justify-between'>
                    <Select
                        handleChange={setSortCategoryId}
                        options={categoryOptions}
                        value={sortCategoryId}
                        defaultOption="All"
                        id='sortCategory'
                        label='Category'
                    />
                </div>
                <div className='flex my-4 justify-between'>
                </div>
            </form>
        </div>
    )
}

export default Filter