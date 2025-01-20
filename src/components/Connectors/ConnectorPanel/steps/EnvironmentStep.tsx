import React from 'react';
import { Stack, Dropdown, IDropdownOption } from '@fluentui/react';
import { useConnectorWizard } from '../ConnectorWizardContext';

const environmentOptions: IDropdownOption[] = [
  { key: 'production', text: 'Production' },
  { key: 'staging', text: 'Staging' },
  { key: 'development', text: 'Development' },
];

export const EnvironmentStep: React.FC = () => {
  const { wizardData, updateWizardData } = useConnectorWizard();

  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <Dropdown
        label="Environment Type"
        options={environmentOptions}
        selectedKey={wizardData.environment.type}
        onChange={(_, option) => 
          updateWizardData('environment', { type: option?.key })
        }
      />
    </Stack>
  );
}; 