import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import drugData from '../../store/drug.json';
import { DrugType } from '../../components/DrugList';

interface DrugState {
  drugs: DrugType[];
  filteredDrugs: DrugType[];
  currentKeyword: string;
  showInStockOnly: boolean;
  currentSortField: 'title' | 'stock';
  currentSortOrder: 'asc' | 'desc';
}

const initialState: DrugState = {
  drugs: drugData,
  filteredDrugs: drugData,
  currentKeyword: '',
  showInStockOnly: false,
  currentSortField: 'title',
  currentSortOrder: 'asc',
};

const applyFilters = (
  drugs: DrugType[],
  keyword: string, 
  inStockOnly: boolean, 
  sortField: 'title' | 'stock', 
  sortOrder: 'asc' | 'desc'
) => {
  let result = [...drugs];
  
  // keyword filter
  if (keyword.trim()) {
    result = result.filter(drug => 
      drug.title.toLowerCase().includes(keyword.toLowerCase()) ||
      drug.desc.toLowerCase().includes(keyword.toLowerCase()) ||
      drug.description.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  
  // stock filter
  if (inStockOnly) {
    result = result.filter(drug => drug.stock > 0);
  }
  
  // sorting
  result.sort((a, b) => {
    if (sortField === 'title') {
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else {
      return sortOrder === 'asc'
        ? a.stock - b.stock
        : b.stock - a.stock;
    }
  });
  
  return result;
};

const drugSlice = createSlice({
  name: 'drug',
  initialState,
  reducers: {
    searchDrugs: (state, action: PayloadAction<string>) => {
      state.currentKeyword = action.payload;
      state.filteredDrugs = applyFilters(
        state.drugs,
        action.payload,
        state.showInStockOnly,
        state.currentSortField,
        state.currentSortOrder
      );
    },
    filterByStock: (state, action: PayloadAction<boolean>) => {
      state.showInStockOnly = action.payload;
      state.filteredDrugs = applyFilters(
        state.drugs,
        state.currentKeyword,
        action.payload,
        state.currentSortField,
        state.currentSortOrder
      );
    },
    sortDrugs: (state, action: PayloadAction<{ field: 'title' | 'stock'; order: 'asc' | 'desc' }>) => {
      const { field, order } = action.payload;
      state.currentSortField = field;
      state.currentSortOrder = order;
      state.filteredDrugs = applyFilters(
        state.drugs,
        state.currentKeyword,
        state.showInStockOnly,
        field,
        order
      );
    },
    decreaseStock: (state, action: PayloadAction<{ drugId: number; quantity: number }>) => {
      const { drugId, quantity } = action.payload;
      
      //decrease stock
      const drugIndex = state.drugs.findIndex(drug => drug.id === drugId);
      if (drugIndex !== -1) {
        state.drugs[drugIndex].stock = Math.max(0, state.drugs[drugIndex].stock - quantity);
      }
      
      // filter
      state.filteredDrugs = applyFilters(
        state.drugs,
        state.currentKeyword,
        state.showInStockOnly,
        state.currentSortField,
        state.currentSortOrder
      );
    },
    updateStock: (state, action: PayloadAction<{ drugId: number; newQuantity: number; oldQuantity: number }>) => {
      const { drugId, newQuantity, oldQuantity } = action.payload;
      const difference = newQuantity - oldQuantity;
      
      // Find the drug and update its stock
      const drugIndex = state.drugs.findIndex(drug => drug.id === drugId);
      if (drugIndex !== -1) {
        state.drugs[drugIndex].stock = Math.max(0, state.drugs[drugIndex].stock - difference);
      }
      
      // Update filtered drugs
      state.filteredDrugs = applyFilters(
        state.drugs,
        state.currentKeyword,
        state.showInStockOnly,
        state.currentSortField,
        state.currentSortOrder
      );
    },
    restoreStock: (state, action: PayloadAction<{ drugId: number; quantity: number }>) => {
      const { drugId, quantity } = action.payload;
      
      // Find the drug and increase its stock
      const drugIndex = state.drugs.findIndex(drug => drug.id === drugId);
      if (drugIndex !== -1) {
        state.drugs[drugIndex].stock += quantity;
      }
      
      // Update filtered drugs
      state.filteredDrugs = applyFilters(
        state.drugs,
        state.currentKeyword,
        state.showInStockOnly,
        state.currentSortField,
        state.currentSortOrder
      );
    }
  },
});

export const { 
  searchDrugs, 
  filterByStock, 
  sortDrugs, 
  decreaseStock, 
  updateStock, 
  restoreStock 
} = drugSlice.actions;

export default drugSlice.reducer;