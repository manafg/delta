import React from 'react';
import { 
  Panel, 
  PanelType, 
  Stack, 
  DefaultButton, 
  PrimaryButton,
} from '@fluentui/react';
import { ConnectorWizardProvider, useConnectorWizard } from './ConnectorWizardContext';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { EnvironmentStep } from './steps/EnvironmentStep';
import { DirectionStep } from './steps/DirectionStep';
import { StepIndicator } from './StepIndicator';

interface ICreateConnectorPanelProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const WizardContent: React.FC = () => {
  const { currentStep, setCurrentStep, wizardData } = useConnectorWizard();

  const steps = [
    { component: BasicInfoStep, title: 'Category' },
    { component: EnvironmentStep, title: 'Configuration' },
    { component: DirectionStep, title: 'Schema' },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form submission
      console.log('Final wizard data:', wizardData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      <CurrentStepComponent />
      
      <Stack horizontal tokens={{ childrenGap: 10 }} style={{ marginTop: '20px' }}>
        {currentStep > 0 && (
          <DefaultButton text="Back" onClick={handleBack} />
        )}
        <PrimaryButton 
          text={currentStep === steps.length - 1 ? 'Create' : 'Next'} 
          onClick={handleNext} 
        />
      </Stack>
    </Stack>
  );
};

const CreateConnectorPanel: React.FC<ICreateConnectorPanelProps> = ({ isOpen, onDismiss }) => {
  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      type={PanelType.largeFixed}
      headerText="Create New Connector"
      closeButtonAriaLabel="Close"
    >
      <ConnectorWizardProvider>
        <WizardContent />
      </ConnectorWizardProvider>
    </Panel>
  );
};

export default CreateConnectorPanel; 