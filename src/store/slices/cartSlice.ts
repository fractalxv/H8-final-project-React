import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DrugType } from '../../components/DrugList';

interface CartItem {
  drug: DrugType;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (parseFloat(item.drug.price.replace(/[^\d.-]/g, '')) * item.quantity), 
    0
  );
  
  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ drug: DrugType; quantity: number }>) => {
      const { drug, quantity } = action.payload;
      const existingItem = state.items.find(item => item.drug.id === drug.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ drug, quantity });
      }
      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const drugId = action.payload;
      state.items = state.items.filter(item => item.drug.id !== drugId);
      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    updateQuantity: (state, action: PayloadAction<{ drugId: number; quantity: number }>) => {
      const { drugId, quantity } = action.payload;
      const item = state.items.find(item => item.drug.id === drugId);
      
      if (item) {
        item.quantity = quantity;
      }
      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;