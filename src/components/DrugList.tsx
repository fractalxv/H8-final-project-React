import { Link } from "react-router-dom";
// import Button friyahom "./UI/Button";
import { useCart } from "../hooks/useCart";
import { useAppSelector } from "../hooks/useReduxHooks";

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
    
    // Get stock information from the Redux store
    const drugs = useAppSelector(state => state.drug.drugs);
    const currentDrug = drugs.find(d => d.id === drug.id);
    const currentStock = currentDrug ? currentDrug.stock : drug.stock;
    
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // navigation to detail page
        e.stopPropagation();
        
        if (currentStock > 0) {
            addToCart(drug, 1);
            // alert(`Added ${drug.title} to cart`);
        }
    };
    
    return (
        <Link to={`/drug/${drug.id}`} key={drug.id} className="transition-transform hover:scale-95 rounded-lg shadow-xl bg-white">
            <div className="flex flex-col h-full p-rounded">
                <div className="relative ">
                    <img 
                        src={drug.imgUrl} 
                        alt={drug.title} 
                        className="w-full h-48 object-contain "
                        // "w-full object-cover justify-between items-baseline h-45
                    />
                    {currentStock <= 0 && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 m-2 rounded">
                            Out of Stock
                        </div>
                    )}
                </div>
                <div className="p-4 flex flex-col flex-grow ">
                    <h2 className="text-lg font-medium text-gray-900">{drug.title}</h2>
                    <p className="text-gray-600 text-sm mb-2">{drug.desc}</p>
                    <div className="mt-auto">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-teal-600">{drug.price}</span>
                            <span className="text-sm text-gray-500">Stock: {currentStock}</span>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={currentStock <= 0}
                            className={`w-full py-2 text-center rounded-md ${
                                currentStock > 0 
                                ? 'bg-teal-600 text-white hover:bg-teal-700' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            } transition-colors`}
                        >
                            {currentStock > 0 ? "Add to Cart" : "Out of Stock"}
                        </button>
                        {/* <Button 
                            className="w-full py-2 text-sm text-center rounded-md " 
                            label={currentStock > 0 ? "Add to Cart" : "Out of Stock"}
                            onClick={handleAddToCart}
                        /> */}
                    </div>
                </div>
            </div>
        </Link>
    );
}