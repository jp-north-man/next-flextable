import { FaHamburger } from 'react-icons/fa';

export function header(){
    return (

        <header className="bg-gray-800 text-white">
            <div className="flex items-center justify-between px-4 py-3">
                <a href="index.tsx" className="font-bold text-lg">app name</a>
                <button className="block lg:hidden focus:outline-none" id="menu-btn">
                <FaHamburger className="w-6 h-6 fill-current" />
                </button>
                <nav className="hidden lg:block">
                <ul className="inline-flex space-x-4">
                    <li><a href="#">Menu 1</a></li>
                    <li><a href="#">Menu 2</a></li>
                    <li><a href="#">Menu 3</a></li>
                </ul>
                </nav>
            </div>
            <div className="hidden lg:hidden" id="mobile-menu">
                <ul className="block px-2 py-3">
                <li><a href="#" className="block text-white font-bold py-2">Menu 1</a></li>
                <li><a href="#" className="block text-gray-500 hover:text-white py-2">Menu 2</a></li>
                <li><a href="#" className="block text-gray-500 hover:text-white py-2">Menu 3</a></li>
                </ul>
            </div>
        </header>

    )
}