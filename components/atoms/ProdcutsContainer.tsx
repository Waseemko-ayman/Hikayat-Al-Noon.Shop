import React from 'react';

const ProdcutsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
      {children}
    </div>
  );
};

export default ProdcutsContainer;
