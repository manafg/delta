import { useEffect, useState } from 'react';
import { getConnectorsCatalogs } from '../../../api/getConnectorsCatalogs';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardTitle,
  IDocumentCardLogoProps,
  IDocumentCardStyles,
} from '@fluentui/react/lib/DocumentCard';
import { mergeStyles } from '@fluentui/react/lib/Styling';

import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

interface Connector {
  id: string;
  name: string;
  description: string;
  direction: number;
  environment: number;
  icon: string;
}

interface ConnectorsCatalogs {
  items: Connector[];
  totalCount: number;
}

const conversationTileClass = mergeStyles({ height: 100 });

// Add direction type constants
const DIRECTION = {
  SOURCE: 1,
  SINK: 2,
};

// Add styles for the choice group
const styles = mergeStyleSets({
  choiceGroup: {
    marginBottom: 20,
    '.ms-ChoiceField': {
      marginRight: 20,
      display: 'inline-block',
    }
  }
});

export default function ConnectorsCategories() {
  const [connectors, setConnectors] = useState<ConnectorsCatalogs>({ items: [], totalCount: 0 });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDirection, setSelectedDirection] = useState<number | null>(null);

  useEffect(() => {
    const fetchConnectors = async (query: string = '') => {
      try {
        const data = await getConnectorsCatalogs(query);
        setConnectors(data);
      } catch (error) {
        console.error("Error fetching connectors:", error);
      }
    };

    fetchConnectors(searchQuery);
  }, [searchQuery]);

  const stackTokens: IStackTokens = { childrenGap: 20 };

  const cardStyles: IDocumentCardStyles = {
    root: { display: 'inline-block', marginRight: 20, width: 320 },
  };

  const logoProps: IDocumentCardLogoProps = {
    logoIcon: 'OutlookLogo',
  };

  const directionOptions: IChoiceGroupOption[] = [
    { key: 'all', text: 'All' },
    { key: 'source', text: 'Source' },
    { key: 'sink', text: 'Sink' },
  ];

  const filteredConnectors = connectors.items.filter(connector => {
    const matchesSearch = connector.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDirection = selectedDirection ? connector.direction === selectedDirection : true;
    return matchesSearch && matchesDirection;
  });

  const handleDirectionChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
    if (option) {
      switch (option.key) {
        case 'source':
          setSelectedDirection(DIRECTION.SOURCE);
          break;
        case 'sink':
          setSelectedDirection(DIRECTION.SINK);
          break;
        default:
          setSelectedDirection(null);
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Connectors</h1>
      
      <TextField
        styles={{ root: { width: '60%', marginBottom: 20 } }}
        label="Search by name"
        value={searchQuery}
        onChange={(e, newValue) => setSearchQuery(newValue || '')}
      />

      <ChoiceGroup
        className={styles.choiceGroup}
        defaultSelectedKey="all"
        options={directionOptions}
        onChange={handleDirectionChange}
        label="Filter by direction"
      />

      <Stack wrap horizontal tokens={stackTokens} styles={{ root: { display: 'flex', flexWrap: 'wrap' } }}>
        {filteredConnectors.map((connector) => (
          <DocumentCard
            key={connector.id}
            aria-label={`Document Card for ${connector.name}`}
            styles={cardStyles}
            onClickHref="http://bing.com"
          >
            <img width={80} height={80} style={{ margin: 10 }} src={connector.icon} alt={`${connector.name} icon`} />
            <div className={conversationTileClass}>
              <DocumentCardTitle title={connector.name} shouldTruncate />
              <DocumentCardTitle
                title={connector.description}
                shouldTruncate
                showAsSecondaryTitle
              />
            </div>
            <DocumentCardActivity
              activity={`Direction: ${connector.direction}, Environment: ${connector.environment}`}
              people={[{ name: connector.name, profileImageSrc: '' }]}
            />
          </DocumentCard>
        ))}
      </Stack>
    </div>
  );
}
