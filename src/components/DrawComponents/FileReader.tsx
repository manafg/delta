import React from 'react';
import { Handle, Position } from 'reactflow';
import { Text, Stack, Icon, Separator } from '@fluentui/react';
import { Card } from '@fluentui/react-cards';
import { FontIcon } from '@fluentui/react/lib/Icon';

const FileReader: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Card 
      className="file-reader-node" 
      tokens={{ childrenGap: 10, padding: 10 }}
      styles={{
        root: {
          border: '1px solid #0078d4', // Blue border
          borderRadius: '4px',
          width: '250px', // Adjust as needed
          cursor: 'pointer', // Add this line to show it's clickable
        }
      }}
      onClick={onClick} // Add this line
    >
      <Handle type="source" position={Position.Right} />
      
      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <FontIcon iconName="TableStackRight" style={{ fontSize: 24, color: '#0078d4' }} />
        <Text variant="large">Azure Data Lake Storage</Text>
      </Stack>
      
      <Separator styles={{ root: { padding: '5px 0' } }} />
      
      <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="space-between">
        <Text>test</Text>
        <Text>CSV</Text>
      </Stack>
    </Card>
  );
};

export default FileReader;