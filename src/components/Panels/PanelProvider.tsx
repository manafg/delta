import React, { ReactNode, useState, useContext, createContext } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import ReactDOM from 'react-dom';

type PanelContentType = 'filereader' | 'aggregate' | 'custom' | 'other'; // Add more types as needed

interface PanelState {
  isOpen: boolean;
  type: PanelContentType;
  content: ReactNode;
  id: string;
  header: string;
}

interface PanelContextType {
  openPanel: (type: PanelContentType, content: ReactNode, id: string, header: string) => void;
  dismissPanel: () => void;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export const PanelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [panelState, setPanelState] = useState<PanelState>({
    isOpen: false,
    type: 'custom',
    content: null,
    id: '',
    header: '',
  });

  const openPanel = (type: PanelContentType, content: ReactNode, id: string, header: string) => {
    setPanelState({ isOpen: true, type, content, id, header });
  };

  const dismissPanel = () => {
    setPanelState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <PanelContext.Provider value={{ openPanel, dismissPanel }}>
      {children}
      {ReactDOM.createPortal(
        <Panel
          headerText={panelState.header}
          isOpen={panelState.isOpen}
          onDismiss={dismissPanel}
          type={PanelType.medium}
        >
          {panelState.content}
        </Panel>,
        document.body
      )}
    </PanelContext.Provider>
  );
};

export const usePanel = () => {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error('usePanel must be used within a PanelProvider');
  }
  return context;
};

// Example usage:
// const App: React.FC = () => {
//   return (
//     <PanelProvider>
//       <ExampleComponent />
//     </PanelProvider>
//   );
// };
//
// const ExampleComponent: React.FC = () => {
//   const { openPanel } = usePanel();
//
//   const handleOpenPanel = () => {
//     openPanel('filereader', <p>File reader content</p>, 'file-1', 'File Reader');
//   };
//
//   return (
//     <button onClick={handleOpenPanel}>Open Panel</button>
//   );
// };
