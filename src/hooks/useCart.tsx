import { useAppSelector, useAppDispatch } from './useReduxHooks';
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} from '../store/slices/cartSlice';
import { DrugType } from '../components/DrugList';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);

  return {
    ...cart,
    addToCart: (drug: DrugType, quantity: number = 1) => 
      dispatch(addToCart({ drug, quantity })),
    removeFromCart: (drugId: number) => 
      dispatch(removeFromCart(drugId)),
    updateQuantity: (drugId: number, quantity: number) => 
      dispatch(updateQuantity({ drugId, quantity })),
    clearCart: () => dispatch(clearCart()),
  };
};