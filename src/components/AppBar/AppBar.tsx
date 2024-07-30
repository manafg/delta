import React from 'react';
import { Stack, Text, IconButton } from '@fluentui/react';

const AppBar: React.FC = () => {
  return (
    <Stack horizontal styles={{ root: { backgroundColor: '#0078d4', padding: '0 20px', height: '48px', alignItems: 'center' } }}>
      <Text variant="large" styles={{ root: { color: 'white', flexGrow: 1 } }}>Rewaya | Pipeline</Text>
      <IconButton iconProps={{ iconName: 'Clock' }} styles={{ root: { color: 'white' } }} />
      <IconButton iconProps={{ iconName: 'Ringer' }} styles={{ root: { color: 'white' } }} />
      <IconButton iconProps={{ iconName: 'Settings' }} styles={{ root: { color: 'white' } }} />
      <IconButton iconProps={{ iconName: 'Help' }} styles={{ root: { color: 'white' } }} />
      <IconButton iconProps={{ iconName: 'Contact' }} styles={{ root: { color: 'white' } }} />
      <Text variant="medium" styles={{ root: { color: 'white', marginLeft: '10px' } }}>Visual Studio Enterprise Subscription</Text>
      <Text variant="medium" styles={{ root: { color: 'white', marginLeft: '10px' } }}>ws-test</Text>
      <IconButton iconProps={{ iconName: 'Contact' }} styles={{ root: { color: 'white' } }} />
    </Stack>
  );
};

export default AppBar;
