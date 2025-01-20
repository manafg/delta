import React, { createContext, useContext, useState } from 'react';

export interface ConnectorWizardData {
  basicInfo: {
    name: string;
    description: string;
  };
  environment: {
    type: string;
    configuration: Record<string, string>;
  };
  direction: {
    type: 'inbound' | 'outbound';
    settings: Record<string, string>;
  };
}

interface ConnectorWizardContextType {
  wizardData: ConnectorWizardData;
  updateWizardData: (stepName: keyof ConnectorWizardData, data: any) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const defaultWizardData: ConnectorWizardData = {
  basicInfo: { name: '', description: '' },
  environment: { type: '', configuration: {} },
  direction: { type: 'inbound', settings: {} },
};

export const ConnectorWizardContext = createContext<ConnectorWizardContextType | undefined>(undefined);

export const ConnectorWizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wizardData, setWizardData] = useState<ConnectorWizardData>(defaultWizardData);
  const [currentStep, setCurrentStep] = useState(0);

  const updateWizardData = (stepName: keyof ConnectorWizardData, data: any) => {
    setWizardData((prev) => ({
      ...prev,
      [stepName]: { ...prev[stepName], ...data },
    }));
  };

  return (
    <ConnectorWizardContext.Provider value={{ wizardData, updateWizardData, currentStep, setCurrentStep }}>
      {children}
    </ConnectorWizardContext.Provider>
  );
};

export const useConnectorWizard = () => {
  const context = useContext(ConnectorWizardContext);
  if (!context) {
    throw new Error('useConnectorWizard must be used within a ConnectorWizardProvider');
  }
  return context;
}; 