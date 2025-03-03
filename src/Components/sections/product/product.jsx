"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const API_URL = "https://dummyjson.com/products/";

async function getProducts() {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900 capitalize">All Products</h1>
        <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-auto max-w-md px-6 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none"/>
      </div>

      {loading ? (<p className="text-center text-gray-500 text-lg">Loading products...</p>) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-red-500 text-lg">No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <li key={product.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="w-full h-auto object-cover relative">
               <img src={product.thumbnail} alt={product.title} className="w-full h-auto object-cover" />
              </div>
              <div className="p-5">
                <p className="text-lg font-medium text-gray-600 capitalize">{product.title}</p>
                <p className="text-sm font-medium text-gray-600 lowercase">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 mt-3 capitalize">Price: ${product.price}</p>
                      <p className="text-sm text-gray-600 capitalize">{product.category}</p>
                    </div>
                <Link href={`product/${product.id}`}>
                  <span className="block text-center bg-black text-white py-2 px-4 rounded-md mt-4 cursor-pointer transition duration-300 hover:bg-gray-800">View Product
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Products;
