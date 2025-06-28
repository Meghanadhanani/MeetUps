import React, { createContext, useContext, useState } from 'react';

const TabVisibilityContext = createContext();

export const TabVisibilityProvider = ({ children }) => {
  const [isTabVisible, setIsTabVisible] = useState(true);

  return (
    <TabVisibilityContext.Provider value={{ isTabVisible, setIsTabVisible }}>
      {children}
    </TabVisibilityContext.Provider>
  );
};

export const useTabVisibility = () => {
  const context = useContext(TabVisibilityContext);
  if (!context) {
    throw new Error('useTabVisibility must be used within TabVisibilityProvider');
  }
  return context;
};
