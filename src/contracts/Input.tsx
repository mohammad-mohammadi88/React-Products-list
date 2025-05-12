import type { FC } from "react";

interface Props {
    handleChange: Function;
    type?: "number" | "text";
    value: string | number;
    [ key: string ]: any;
    label: string;
    id: string;
    className?:string
}

const Input: FC<Props> = ({ value, handleChange,className, id, label, type = "text", ...props }) => (
    <>
        <label htmlFor={id} className='block text-slate-400 my-1'>
            {label}
        </label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={(e) =>
                handleChange(
                    type === "number"
                        ? Number(e.target.value)
                        : String(e.target.value)
                )
            }
            className={`border rounded-xl border-slate-500  focus-visible:border-blue-500 focus-visible:outline-0 md:w-auto p-2 text-slate-400 ${className ?? ""}`}
            required
            {...props}
        />
    </>
);

export default Input;
