import React, { useEffect, useState } from 'react';
import {
  SearchBox,
  DetailsList,
  IColumn,
  SelectionMode,
  Stack,
  StackItem,
  DefaultButton,
  IStackTokens,
  Text,
  FontIcon,
  ITextStyles,
  IStackStyles
} from '@fluentui/react';
import { postConnectorsList } from '../api/listConnecters';
import { useNavigate } from 'react-router-dom';
import CreateConnectorPanel from '../components/Connectors/ConnectorPanel/CreateConnectorPanel';

interface IConnector {
  id: string;
  name: string;
  status: string;
  environment: string;
  direction: string;
}

const stackTokens: IStackTokens = {
  childrenGap: 20,
  padding: 20,
};

const emptyStateTextStyles: ITextStyles = {
  root: {
    fontSize: '16px',
    color: '#666666'
  }
};

const emptyStateStackStyles: IStackStyles = {
  root: {
    height: '300px',
    backgroundColor: '#f8f8f8',
    borderRadius: '4px'
  }
};

const Connectors: React.FC = () => {
  const [connectors, setConnectors] = useState<IConnector[]>([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const columns: IColumn[] = [
    {
      key: 'name',
      name: 'Name',
      fieldName: 'name',
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 100,
      maxWidth: 100,
    },
    {
      key: 'environment',
      name: 'Environment',
      fieldName: 'environment',
      minWidth: 100,
      maxWidth: 150,
    },
    {
      key: 'direction',
      name: 'Direction',
      fieldName: 'direction',
      minWidth: 100,
      maxWidth: 150,
    },
  ];

  const fetchConnectors = async () => {
    try {
      const response = await postConnectorsList(10, 0, 0, 0, 0); // Default values
      setConnectors(response.items || []);
    } catch (error) {
      console.error('Failed to fetch connectors:', error);
    }
  };

  useEffect(() => {
    fetchConnectors();
  }, []);

  const handleSearch = (newValue?: string) => {
    setSearchText(newValue || '');
    // Implement search logic here
  };

  const handleCreateNew = () => {
    setIsPanelOpen(true);
  };

  const handlePanelDismiss = () => {
    setIsPanelOpen(false);
  };

  const filteredConnectors = connectors.filter(connector =>
    connector.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderContent = () => {
    if (connectors.length === 0) {
      return (
        <Stack
          horizontalAlign="center"
          verticalAlign="center"
          styles={emptyStateStackStyles}
        >
          <FontIcon
            iconName="Connector"
            style={{ fontSize: '32px', color: '#666666', marginBottom: '12px' }}
          />
          <Text styles={emptyStateTextStyles}>No connectors found</Text>
          <Text styles={emptyStateTextStyles} style={{ marginBottom: '16px' }}>
            Get started by creating your first connector
          </Text>
          <DefaultButton
            text="Create New Connector"
            onClick={handleCreateNew}
            primary
          />
        </Stack>
      );
    }

    return (
      <DetailsList
        items={filteredConnectors}
        columns={columns}
        selectionMode={SelectionMode.none}
        isHeaderVisible={true}
      />
    );
  };

  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal horizontalAlign="space-between">
        <StackItem grow={1}>
          <SearchBox
            placeholder="Search connectors..."
            onChange={(_, newValue) => handleSearch(newValue)}
            styles={{ root: { width: 300 } }}
          />
        </StackItem>
        <StackItem>
          <DefaultButton
            text="Create New Connector"
            onClick={handleCreateNew}
            primary
          />
        </StackItem>
      </Stack>

      {renderContent()}

      <CreateConnectorPanel 
        isOpen={isPanelOpen}
        onDismiss={handlePanelDismiss}
      />
    </Stack>
  );
};

export default Connectors;
