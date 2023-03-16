import { FaHamburger } from 'react-icons/fa';
import Link from 'next/link';

export function header(){
    return (

        <header className="bg-slate-50 text-black">
            <div className="flex items-center justify-between px-4 py-3">
                <a href="index.tsx" className="font-bold text-lg">FlexTable</a>
                <Link href={'/create'} className="mr-10">create</Link>
            </div>
        </header>

    )
}