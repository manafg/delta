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

export default function Connectors() {
  const [connectors, setConnectors] = useState<ConnectorsCatalogs>({ items: [], totalCount: 0 });
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  return (
    <div style={{ padding: 20 }}>
      <h1>Connectors</h1>
      
      <TextField
        styles={{ root: { width: '60%', marginBottom: 20 } }}
        label="Search by name"
        value={searchQuery}
        onChange={(e, newValue) => setSearchQuery(newValue || '')}
      />
      <Stack wrap horizontal tokens={stackTokens} styles={{ root: { display: 'flex', flexWrap: 'wrap' } }}>
        {connectors.items?.map((connector) => (
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
