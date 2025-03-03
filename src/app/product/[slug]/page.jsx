"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

function SingleProduct() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("An error occurred while fetching the product.");
      })
      .finally(() => setIsLoading(false));
  }, [id]);


  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">No product found.</p>
      </div>
    );
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 py-14">
      <div className="bg-white w-2/6 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center py-10">
        <div className="w-full flex justify-center items-center p-6">
          <Image src={product.thumbnail} alt={product.title} width={500} height={500} className="object-contain max-h-80 w-full"/>
        </div>
        <div className="p-6 w-full">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex justify-between mb-4">
            <p className="text-base font-semibold text-black">
              Stock: {product.stock}
            </p>
            <p className="text-base font-semibold text-black">
              Price: ${product.price}
            </p>
            <p className="text-base font-semibold text-black mb-4 text-center">
              Category: {product.category}
            </p>
          </div>
          <button className="bg-white text-black hover:bg-black hover:text-white rounded py-2 px-8 capitalize mt-3 border border-black">Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;
