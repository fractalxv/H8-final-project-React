import React, { createContext, useContext, ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useReduxHooks';
import { searchDrugs, filterByStock, sortDrugs } from '../store/slices/drugSlice';
import { DrugType } from '../components/DrugList';

interface DrugContextType {
  drugs: DrugType[];
  filteredDrugs: DrugType[];
  searchDrugs: (keyword: string) => void;
  filterByStock: (inStockOnly: boolean) => void;
  sortDrugs: (field: 'title' | 'stock', order: 'asc' | 'desc') => void;
}

const DrugContext = createContext<DrugContextType | undefined>(undefined);

export function DrugProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { drugs, filteredDrugs } = useAppSelector(state => state.drug);
  
  const handleSearchDrugs = (keyword: string) => {
    dispatch(searchDrugs(keyword));
  };
  
  const handleFilterByStock = (inStockOnly: boolean) => {
    dispatch(filterByStock(inStockOnly));
  };
  
  const handleSortDrugs = (field: 'title' | 'stock', order: 'asc' | 'desc') => {
    dispatch(sortDrugs({ field, order }));
  };
  
  return (
    <DrugContext.Provider value={{ 
      drugs, 
      filteredDrugs, 
      searchDrugs: handleSearchDrugs, 
      filterByStock: handleFilterByStock, 
      sortDrugs: handleSortDrugs 
    }}>
      {children}
    </DrugContext.Provider>
  );
}

export function useDrug() {
  const context = useContext(DrugContext);
  if (context === undefined) {
    throw new Error('useDrug must be used within a DrugProvider');
  }
  return context;
}