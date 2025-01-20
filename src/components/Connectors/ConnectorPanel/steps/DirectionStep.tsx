import React from 'react';
import { Stack, ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';
import { useConnectorWizard } from '../ConnectorWizardContext';

const directionOptions: IChoiceGroupOption[] = [
  { key: 'inbound', text: 'Inbound' },
  { key: 'outbound', text: 'Outbound' },
];

export const DirectionStep: React.FC = () => {
  const { wizardData, updateWizardData } = useConnectorWizard();

  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <ChoiceGroup
        label="Connector Direction"
        options={directionOptions}
        selectedKey={wizardData.direction.type}
        onChange={(_, option) => 
          updateWizardData('direction', { type: option?.key })
        }
      />
    </Stack>
  );
}; 