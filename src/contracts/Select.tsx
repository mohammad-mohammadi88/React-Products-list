import type { UUIDTypes } from "uuid";
import type { FC } from "react";

export interface Option {
    name: string;
    value: string | UUIDTypes;
}
interface Props {
    handleChange: Function;
    options: Option[];
    className?:string;
    value: string;
    label?: string;
    id: string;
    defaultOption?:string
}

const Select: FC<Props> = ({ label, id,className, value, handleChange, options,defaultOption }) => (
    <>
        {label && <label htmlFor={id} className='block text-slate-400 my-1'>
           {label}
        </label>}
        <select
            className={`border rounded-xl focus:border-blue-500 focus:outline-0 text-slate-300 border-slate-500 p-3 ${className ?? ""}`}
            onChange={(e) => handleChange(e.target.value)}
            value={value}
            required
            id={id}
        >
            {defaultOption && <option className="bg-slate-600" value=''>{defaultOption}</option>}
            {options.map(({ name, value }) => (
                <option
                    className="bg-slate-600"
                    value={String(value)}
                    key={String(value)}
                >{name}</option>
            ))}
        </select>
    </>
);


export default Select;
