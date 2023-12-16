import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border border-b-1">
        <ul className="flex items-center justify-between p-4 max-w-7xl mx-auto">

            {/* Search */}
            <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>

                <input type="text" placeholder="Search books..." className="outline-none max-w-[140px] md:max-w-none" />
            </li>

            {/* Logo */}
            <NavLink to='/' className="flex items-center gap-2 md:-ml-40 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <span className="text-2xl font-bold text-primary hidden md:block">BookStore</span>
            </NavLink>

            {/* Create and Profile */}
            <li className="flex items-center gap-2">
                <NavLink to='/create' className="text-white bg-primary px-3 py-1 rounded-xl flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="hidden md:block">Create book</span>
                </NavLink>
                <div className="w-11 ">
                    <img src="https://avatars.githubusercontent.com/u/118127700?v=4" alt="" className="w-full rounded-full" />
                </div>
            </li>
        </ul>
    </nav>
  );
}

export default Navbar;
