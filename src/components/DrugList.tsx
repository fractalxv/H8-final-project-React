import { Link } from "react-router-dom";
import Button from "./UI/Button";
import { useCart } from "../hooks/useCart";

export interface DrugType {
    id: number,
    title: string,
    desc: string,
    description: string,
    price: string,
    stock: number,
    imgUrl: string,
}

export default function DrugList({ drug }: { drug: DrugType }) {
    const { addToCart } = useCart();
    
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation to detail page
        e.stopPropagation();
        
        if (drug.stock > 0) {
            addToCart(drug, 1);
            alert(`Added ${drug.title} to cart`);
        }
    };
    
    return (
        <Link to={`/drug/${drug.id}`} key={drug.id} className="transition-transform hover:scale-105 rounded-lg shadow-xl bg-white overflow-hidden">
            <div className="flex flex-col h-full">
                <div className="relative">
                    <img 
                        src={drug.imgUrl} 
                        alt={drug.title} 
                        className="w-full h-48 object-cover"
                    />
                    {drug.stock <= 0 && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 m-2 rounded">
                            Out of Stock
                        </div>
                    )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-lg font-medium text-gray-900">{drug.title}</h2>
                    <p className="text-gray-600 text-sm mb-2">{drug.desc}</p>
                    <div className="mt-auto">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-teal-600">{drug.price}</span>
                            <span className="text-sm text-gray-500">Stock: {drug.stock}</span>
                        </div>
                        <Button 
                            className="w-full py-2 text-sm" 
                            label={drug.stock > 0 ? "Add to Cart" : "Out of Stock"}
                            onClick={handleAddToCart}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
}