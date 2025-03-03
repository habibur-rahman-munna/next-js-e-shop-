import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 bg-white text-black py-6 border-gray-200 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-3xl font-bold uppercase text-black">
          <Link href="/"> e-<span className="text-red-600">shop</span></Link>
        </div>

        <nav>
          <ul className="flex space-x-6 items-center justify-center">
            <li><Link href="/" className="text-gray-600 hover:text-red-600 text-base font-bold capitalize">home</Link></li>
            <li><Link href="/product"className="text-gray-600 hover:text-red-600 text-base font-bold capitalize">product</Link></li>
            <li> <Link href="/categories"className="text-gray-600 hover:text-red-600 text-base font-bold capitalize">Categories</Link></li>
            <li><Link href="/contact"className="text-gray-600 hover:text-red-600 text-base font-bold capitalize">contact</Link></li>
          </ul>
        </nav>

        <Link href="#"className="bg-white text-black hover:bg-red-600 hover:text-white border border-black rounded hover:border-none py-2 px-8 capitalize flex items-center gap-2"><ShoppingCart size={18} /> cart
        </Link>
      </div>
    </header>
  );
};

export default Header;
