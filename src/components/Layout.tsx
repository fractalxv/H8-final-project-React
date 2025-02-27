import React from 'react';
import Header from './Header';
import { useAuth } from '../hooks/useAuth';
import { useState, useCallback } from 'react';
// import { useDrug } from '../context/DrugContext';
import { useAppDispatch } from '../hooks/useReduxHooks';
import { searchDrugs } from '../store/slices/drugSlice';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState('');

  const handleSearch = useCallback(() => {
    dispatch(searchDrugs(keyword));
  }, [keyword, dispatch]);

  return (
    <div>
      {isAuthenticated && (
        <>
          <Header 
            title="EasyPharmacy" 
            keyword={keyword} 
            setKeyword={setKeyword} 
            onChange={handleSearch} 
          />
          <div className="container mx-auto px-6 ">
            {children}
          </div>
        </>
      )}
      
      {!isAuthenticated && children}
    </div>
  );
}