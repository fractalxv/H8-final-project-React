import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import drugData from "../store/drug.json";
import { DrugType } from "./DrugList";
import Button from "./UI/Button";
import { useCart } from "../hooks/useCart";
import { useAppSelector } from "../hooks/useReduxHooks";

export default function DrugDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Get the drug from the Redux store
  const drugs = useAppSelector(state => state.drug.drugs);
  const drugItem: DrugType = drugs.find(
    (drug) => drug.id === parseInt(id as string)
  )!;

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  // Check if in stock
  const inStock = drugItem.stock > 0;
  
  const handleAddToCart = () => {
    if (inStock && quantity > 0 && quantity <= drugItem.stock) {
      addToCart(drugItem, quantity);
      // Show success notification
      // alert(`Added ${quantity} ${drugItem.title} to cart`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 md:flex-row rounded-xl">
      {/* Left section: Medicine details - WIDER */}
      <div className="bg-white shadow-lg rounded-xl p-9 md:w-2/3">
        <div className="flex justify-center mb-6">
          <img
            src={drugItem.imgUrl}
            className="h-80 object-contain"
            alt={drugItem.title}
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {drugItem.title}
        </h3>
        <div className="text-gray-500 mb-4">
          {drugItem.desc} - {drugItem.price}
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {drugItem.description}
        </p>

        <div className="flex items-center mb-4">
          <span className="font-medium mr-2">Stock:</span>
          <span className={`${inStock ? 'text-green-600' : 'text-red-600'}`}>
            {inStock ? `${drugItem.stock} available` : 'Out of stock'}
          </span>
        </div>
          
        {inStock && (
          <div className="flex items-center space-x-4 mb-6">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="px-3 py-1">{quantity}</span>
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(prev => Math.min(drugItem.stock, prev + 1))}
              >
                +
              </button>
            </div>
          </div>
        )}
          
        <div className="flex space-x-4">
          <Button 
            label="Back"
            onClick={() => navigate(-1)}
          />
          
          <button
            disabled={!inStock}
            onClick={handleAddToCart}
            className={`px-6 py-2 rounded-md ${inStock ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl border-l border-gray-200 md:w-1/3">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center text-teal-500 ">
          Bagaimana Membeli Obat di EasyPharmacy?
          </h3>
          <div className="mb-6">
            <img 
              src="https://img.freepik.com/free-vector/medicine-concept-illustration_114360-30752.jpg" 
              alt="Medicine purchase illustration" 
              className="w-full object-contain mb-4"
            />
          </div>
          <ul className="space-y-6">
            <li className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="teal">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span>Cari obat sesuai kebutuhan anda</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="teal">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span>Pilih obat sesuai dengan deskripsi (lampirkan resep dokter jika membeli obat keras)</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="teal">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span>Isi form keterangan pengguna</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// src="https://img.freepik.com/free-vector/medicine-concept-illustration_114360-30752.jpg" 
