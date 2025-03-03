"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const CATEGORY_URL = "https://dummyjson.com/products/categories";

async function getCategories() {
  try {
    const res = await fetch(CATEGORY_URL);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }
}

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-900 capitalize">Shop by Category</h2>
      <input type="text" placeholder="Search categories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-auto max-w-md px-6 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none mb-6"
      />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading categories...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <Link href={`/categories/${category.slug}`}>
                <span className="block px-6 py-3 bg-gray-200 text-gray-800 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300">
                {category.name}
                </span>
              </Link>
              )))
              : (
                  <p className="col-span-full text-gray-500 text-center">No categories found.</p>
                )}
        </div>

      )}
    </section>
  );
};

export default Categories;
