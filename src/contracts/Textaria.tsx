import type { FC } from "react";

interface Props {
    handleChange: Function;
    [key: string]: any;
    value: string;
    label: string;
    id: string;
}

const Textaria: FC<Props> = ({ value, handleChange, id, label, ...props }) => (
    <div>
        <label htmlFor={id} className='text-slate-400 my-1 block'>
            {label}
        </label>
        <textarea
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            id={id}
            className='border rounded-xl border-slate-500 w-full focus-visible:border-blue-500 focus-visible:outline-0 py-2 px-3 text-slate-400'
            required
            rows={2}
            {...props}
        ></textarea>
    </div>
);

export default Textaria;
