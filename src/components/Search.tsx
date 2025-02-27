import React from 'react';

interface SearchProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  onChange: () => void;
}

export default function Search({ keyword, setKeyword, onChange }: SearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    onChange();
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search medicines..."
        value={keyword}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
       <button 
          type="submit" 
          className="absolute right-12 top-1/2 transform -translate-y-1/2"
        >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      </button>
    </div>
  );
}