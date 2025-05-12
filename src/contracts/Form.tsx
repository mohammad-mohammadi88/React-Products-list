import type { FormEventHandler, FC, ReactNode } from "react";

interface Props {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    children: ReactNode;
    formName: string;
}

const Form: FC<Props> = ({ handleSubmit, formName, children }) => (
    <>
        <h2 className='text-xl mt-8 font-bold text-slate-300'>{formName}</h2>
        <form
            onSubmit={handleSubmit}
            className='bg-slate-700 w-full rounded-xl space-y-4 px-4 py-3 mt-3'
        >
            {children}
        </form>
    </>
);

export default Form;
