"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CartPage = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [quantity, setQuantity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    setCart(storedCart);
    setQuantity(storedCart.quantity || 1);
  }, []);


  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(newQuantity);
  };


  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);


  const subtotal = cart.price * quantity;

 
  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="py-20 px-20 max-w-4xl w-full bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 capitalize">Cart</h1>

        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-4 capitalize text-center">Product</th>
              <th className="border border-gray-200 p-4 capitalize text-center">Price</th>
              <th className="border border-gray-200 p-4 capitalize text-center">Quantity</th>
              <th className="border border-gray-200 p-4 capitalize text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart && (
              <tr className="text-center">
                <td className="border border-gray-200 p-4 flex justify-center items-center">
                  <img src={cart.img} alt="product image" className="w-24 h-24 mr-4" />
                  <h2 className="font-semibold capitalize">{cart.title}</h2>
                </td>
                <td className="border border-gray-200 p-4 font-semibold">${cart.price}</td>
                <td className="border border-gray-200 p-4">
                  <div className="flex justify-center items-center gap-2">
                    <button className="px-2 py-1 text-black rounded-l font-semibold" onClick={decrementQuantity}>-</button>
                    <input type="number" className="w-12 text-center border border-gray-300 font-semibold" value={quantity} onChange={handleQuantityChange}/>
                    <button className="px-2 py-1 text-black rounded-r font-semibold" onClick={incrementQuantity}>+</button>
                  </div>
                </td>
                <td className="border border-gray-200 px-2 py-1 font-semibold">${subtotal.toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-8">
          <button onClick={handleClick} disabled={isLoading} className={`${isLoading ? "bg-black text-white cursor-not-allowed" : "bg-white text-black hover:bg-black hover:text-white"} rounded py-3 px-8 capitalize border border-black`}>
            <Link href="#"> {isLoading ? "Loading.." : "Buy Now"} </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
