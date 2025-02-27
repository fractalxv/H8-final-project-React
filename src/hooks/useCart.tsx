import { useAppSelector, useAppDispatch } from './useReduxHooks';
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} from '../store/slices/cartSlice';
import { 
  decreaseStock, 
  updateStock, 
  restoreStock 
} from '../store/slices/drugSlice';
import { DrugType } from '../components/DrugList';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);

  return {
    ...cart,
    addToCart: (drug: DrugType, quantity: number = 1) => {
      dispatch(addToCart({ drug, quantity }));
      dispatch(decreaseStock({ drugId: drug.id, quantity }));
    },
    removeFromCart: (drugId: number) => {
      // Find the item
      const item = cart.items.find(item => item.drug.id === drugId);
      if (item) {
        // Restore the stock 
        dispatch(restoreStock({ drugId, quantity: item.quantity }));
        dispatch(removeFromCart(drugId));
      }
    },
    updateQuantity: (drugId: number, newQuantity: number) => {
      // Find the item 
      const item = cart.items.find(item => item.drug.id === drugId);
      if (item) {
        const oldQuantity = item.quantity;
        
        // Update the stock 
        if (newQuantity !== oldQuantity) {
          dispatch(updateStock({ drugId, newQuantity, oldQuantity }));
        }
        
        dispatch(updateQuantity({ drugId, quantity: newQuantity }));
      }
    },
    clearCart: () => {
      // Restore all stock 
      cart.items.forEach(item => {
        dispatch(restoreStock({ drugId: item.drug.id, quantity: item.quantity }));
      });
      
      dispatch(clearCart());
    },
  };
};