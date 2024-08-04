import React, { useRef, useState } from 'react';
import { Stack, Text, IconButton, DirectionalHint, ContextualMenu, IContextualMenuItem } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

const AppBar: React.FC = () => {
  const [showContactMenu, setShowContactMenu] = useState(false);
  const contactIconRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('token', '');
    navigate('/login');
  };

  const contactMenuItems: IContextualMenuItem[] = [
    {
      key: 'logout',
      text: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Stack horizontal styles={{ root: { backgroundColor: '#0078d4', padding: '0 20px', height: '48px', alignItems: 'center' } }}>
      <IconButton 
        iconProps={{ iconName: 'Contact' }} 
        styles={{ root: { color: 'white' } }} 
        onClick={() => setShowContactMenu(true)}
      />
      <Text variant="large" styles={{ root: { color: 'white', flexGrow: 1 } }}>Delta | Pipeline</Text>
      <IconButton iconProps={{ iconName: 'Clock' }} styles={{ root: { color: 'white' } }} />
      <IconButton iconProps={{ iconName: 'Ringer' }} styles={{ root: { color: 'white' } }} />
      <IconButton iconProps={{ iconName: 'Settings' }} styles={{ root: { color: 'white' } }} />
      <IconButton iconProps={{ iconName: 'Help' }} styles={{ root: { color: 'white' } }} />
     
      <ContextualMenu
        calloutProps={{
          styles: {
            root: {
              top: '8px !important',
              left: '8px !important',
              maxHeight: '234px !important',
            },
          },
        }}
        items={contactMenuItems}
        hidden={!showContactMenu}
        target={contactIconRef.current}
        onDismiss={() => setShowContactMenu(false)}
      />
    </Stack>
  );
};

export default AppBar;