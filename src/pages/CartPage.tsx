import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Button from '../components/UI/Button';

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Link
          to="/"
          className="inline-flex items-center text-teal-600 hover:text-teal-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-4">
          {items.map((item) => (
            <div
              key={item.drug.id}
              className="flex items-center space-x-4 py-4 border-b last:border-0"
            >
              <img
                src={item.drug.imgUrl}
                alt={item.drug.title}
                className="h-20 w-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.drug.title}
                </h3>
                <p className="text-sm text-gray-600">{item.drug.desc}</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.drug.id, Number(e.target.value))}
                  className="rounded-md border-gray-300 text-gray-700"
                >
                  {[...Array(item.drug.stock)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    {item.drug.price}
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.drug.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-teal-600">Rp {totalPrice.toFixed(2)}</span>
          </div>
          <Button
            label="Proceed to Checkout"
            className="mt-4 w-full py-3 px-6"
          />
        </div>
      </div>
    </div>
  );
}