import Head from 'next/head';
import Image from 'next/image';

async function getCategoryProducts(slug) {
  const res = await fetch(`https://dummyjson.com/products/category/${slug}`);
  if (!res.ok) {
    throw new Error('Failed to fetch category products');
  }
  return res.json();
}

export default async function CategoryPage({ params }) {
  const { slug } = params;
  const { products } = await getCategoryProducts(slug);

  if (!products || products.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center text-gray-500">
        <p>No products found for this category.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-wrap justify-center gap-6 min-h-screen bg-gray-100 py-14">
      {products.map((product) => (
        <div key={product.id} className="bg-white w-2/6 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center py-10 mb-6">
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
            <button className="bg-white text-black hover:bg-black hover:text-white rounded py-2 px-8 capitalize mt-3 border border-black">
              Add to Cart
            </button>
          </div> 
        </div>
      ))}
    </section>

    
  );
}
