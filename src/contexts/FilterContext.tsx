import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FilterState {
  department: string;
  position: string;
  talentType: string;
  reviewPeriod: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

interface FilterContextType {
  filters: FilterState;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  department: 'all',
  position: 'all',
  talentType: 'all',
  reviewPeriod: 'last-quarter',
  dateRange: {
    from: undefined,
    to: undefined,
  },
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return context;
};
