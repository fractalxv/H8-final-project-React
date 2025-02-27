import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import obatData from '../store/obat.json';
import { ObatType } from '../components/ObatList';

interface ObatContextType {
  obats: ObatType[];
  filteredObats: ObatType[];
  searchObats: (keyword: string) => void;
  filterByStock: (inStockOnly: boolean) => void;
  sortObats: (field: 'title' | 'stock', order: 'asc' | 'desc') => void;
}

const ObatContext = createContext<ObatContextType | undefined>(undefined);

export function ObatProvider({ children }: { children: ReactNode }) {
  const [obats] = useState<ObatType[]>(obatData);
  const [filteredObats, setFilteredObats] = useState<ObatType[]>(obatData);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [currentSortField, setCurrentSortField] = useState<'title' | 'stock'>('title');
  const [currentSortOrder, setCurrentSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Use useCallback to prevent recreation of these functions on every render
  const searchObats = useCallback((keyword: string) => {
    setCurrentKeyword(keyword);
    applyFilters(keyword, showInStockOnly, currentSortField, currentSortOrder);
  }, [showInStockOnly, currentSortField, currentSortOrder]);
  
  const filterByStock = useCallback((inStockOnly: boolean) => {
    setShowInStockOnly(inStockOnly);
    applyFilters(currentKeyword, inStockOnly, currentSortField, currentSortOrder);
  }, [currentKeyword, currentSortField, currentSortOrder]);
  
  const sortObats = useCallback((field: 'title' | 'stock', order: 'asc' | 'desc') => {
    setCurrentSortField(field);
    setCurrentSortOrder(order);
    applyFilters(currentKeyword, showInStockOnly, field, order);
  }, [currentKeyword, showInStockOnly]);
  
  // Helper function to apply all filters at once
  const applyFilters = (
    keyword: string, 
    inStockOnly: boolean, 
    sortField: 'title' | 'stock', 
    sortOrder: 'asc' | 'desc'
  ) => {
    let result = [...obats];
    
    // Apply keyword filter
    if (keyword.trim()) {
      result = result.filter(obat => 
        obat.title.toLowerCase().includes(keyword.toLowerCase()) ||
        obat.desc.toLowerCase().includes(keyword.toLowerCase()) ||
        obat.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    // Apply stock filter
    if (inStockOnly) {
      result = result.filter(obat => obat.stock > 0);
    }
    
    // Apply sorting
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
    
    setFilteredObats(result);
  };
  
  return (
    <ObatContext.Provider value={{ 
      obats, 
      filteredObats, 
      searchObats, 
      filterByStock, 
      sortObats 
    }}>
      {children}
    </ObatContext.Provider>
  );
}

export function useObat() {
  const context = useContext(ObatContext);
  if (context === undefined) {
    throw new Error('useObat must be used within an ObatProvider');
  }
  return context;
}