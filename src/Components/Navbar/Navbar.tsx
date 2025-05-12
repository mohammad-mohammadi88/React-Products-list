import { useProducts } from '../../Context/Provider';
import type { FC } from 'react';

const Navbar: FC = () => {
    const {products:{length}} = useProducts()
    return (
        <nav className='bg-slate-700 flex justify-center h-12 items-center'>
            <div className='md:text-xl text-sm font-bold text-slate-300 flex'>Inventory products list using tailwind & React.js <span className='flex items-center justify-center text-base mx-2 w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300'>{length <= 100 ? length : "99+"}</span></div>
        </nav>
    )
}

export default Navbar