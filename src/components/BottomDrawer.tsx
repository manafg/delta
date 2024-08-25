import React from 'react';
import { Panel, PanelType, IconButton, Stack, Pivot, PivotItem, IStyleFunction, IPanelStyles } from '@fluentui/react';

interface DrawerPanelProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const DrawerPanel: React.FC<DrawerPanelProps> = ({ isOpen, onDismiss }) => {
  const panelStyles: IStyleFunction<{}, IPanelStyles> = () => ({
    main: {
      marginBottom: 0,
      top: 'auto',
      height: '50%',
      left: '200px',
      boxShadow: 'none',
      borderTop: '1px solid #eee',
      // Override .main-236 class
      selectors: {
        '&.main-236': {
          boxShadow: 'none',
        },
      },
    },
    scrollableContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      padding: '0',
    },
    commands: {
      display: 'none',
    },
  });

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      type={PanelType.custom}
      customWidth="calc(100% - 200px)"
      isBlocking={false}
      headerText=""
      onRenderNavigationContent={() => null}
      styles={panelStyles}
    >
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{
        root: {
          padding: '0 10px',
          borderBottom: '1px solid #eee',
        }
      }}>
        <Pivot>
          <PivotItem headerText="Data preview" />
          <PivotItem headerText="Authoring errors" />
          <PivotItem headerText="Runtime logs" />
          <PivotItem headerText="Metrics" />
        </Pivot>
        <IconButton
          iconProps={{ iconName: 'ChevronDown' }}
          onClick={onDismiss}
          styles={{
            root: {
              color: '#666',
            },
          }}
        />
      </Stack>
      <div style={{ padding: '20px' }}>
        <p>This is the content of your draggable drawer.</p>
      </div>
    </Panel>
  );
};

export default DrawerPanel;