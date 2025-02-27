import React, { useState, useEffect } from 'react';
import { useDrug } from '../context/DrugContext';
import DrugList from '../components/DrugList';
import { useAppDispatch } from '../hooks/useReduxHooks';
import { filterByStock, sortDrugs } from '../store/slices/drugSlice';

export default function Home() {
  const { filteredDrugs } = useDrug();
  const dispatch = useAppDispatch();
  const [showInStock, setShowInStock] = useState(false);
  const [sortField, setSortField] = useState<'title' | 'stock'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Effect for stock filter
  useEffect(() => {
    dispatch(filterByStock(showInStock));
  }, [showInStock, dispatch]);

  // Effect for sorting
  useEffect(() => {
    dispatch(sortDrugs({ field: sortField, order: sortOrder }));
  }, [sortField, sortOrder, dispatch]);

  const toggleSort = (field: 'title' | 'stock') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 my-6">
        <button
          onClick={() => toggleSort('title')}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg border ${
            sortField === 'title' ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span>Name</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            style={{ transform: sortField === 'title' && sortOrder === 'desc' ? 'rotate(180deg)' : 'none' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
        <button
          onClick={() => toggleSort('stock')}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg border ${
            sortField === 'stock' ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span>Stock</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            style={{ transform: sortField === 'stock' && sortOrder === 'desc' ? 'rotate(180deg)' : 'none' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showInStock}
            onChange={(e) => setShowInStock(e.target.checked)}
            className="rounded text-teal-600 focus:ring-teal-500"
          />
          <span>In Stock Only</span>
        </label>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDrugs.map((drug) => (
          <DrugList key={drug.id} drug={drug} />
        ))}
      </div>

      {filteredDrugs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No medicines found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}