import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DrawerContextProps {
  isOpen: boolean;
  jobId: string | null;
  unitId: string | null;
  openDrawer: (jobId: string, unitId: string) => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [unitId, setUnitId] = useState<string | null>(null);

  const openDrawer = (newJobId: string, newUnitId: string) => {
    setJobId(newJobId);
    setUnitId(newUnitId);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setJobId(null);
    setUnitId(null);
    setIsOpen(false);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, jobId, unitId, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
