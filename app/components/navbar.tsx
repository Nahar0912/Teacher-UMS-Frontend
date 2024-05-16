// components/Navbar.tsx

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <span className="text-white font-bold text-xl cursor-pointer">Portal</span>
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/dashboard">
            <span className="text-white hover:text-gray-300 cursor-pointer">Dashboard</span>
          </Link>
          <Link href="/about">
            <span className="text-white hover:text-gray-300 cursor-pointer">About</span>
          </Link>
          <Link href="/contact">
            <span className="text-white hover:text-gray-300 cursor-pointer">Contact</span>
          </Link>
          <Link href="/signup">
            <span className="text-white hover:text-gray-300 cursor-pointer">Sign Up</span>
          </Link>
          <Link href="/">
            <span className="text-white hover:text-gray-300 cursor-pointer">Log in</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
 
export default Navbar;
