import React from 'react';
import { Stack, TextField } from '@fluentui/react';
import { useConnectorWizard } from '../ConnectorWizardContext';
import ConnectorsCategories from '../../ConnecterCategories/ConnectorsCategories';
export const BasicInfoStep: React.FC = () => {
  const { wizardData, updateWizardData } = useConnectorWizard();

  return (
    <ConnectorsCategories />
    // <Stack tokens={{ childrenGap: 15 }}>
    //   <TextField
    //     label="Connector Name"
    //     required
    //     value={wizardData.basicInfo.name}
    //     onChange={(_, newValue) => 
    //       updateWizardData('basicInfo', { name: newValue })
    //     }
    //   />
    //   <TextField
    //     label="Description"
    //     multiline
    //     rows={3}
    //     value={wizardData.basicInfo.description}
    //     onChange={(_, newValue) => 
    //       updateWizardData('basicInfo', { description: newValue })
    //     }
    //   />
    // </Stack>
  );
}; 