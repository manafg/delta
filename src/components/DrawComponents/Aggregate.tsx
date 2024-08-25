import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Text, Stack, Icon, Separator } from '@fluentui/react';
import { Card } from '@fluentui/react-cards';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { NodeProps } from '@xyflow/react';

interface AggregateProps extends NodeProps {
  onClick?: () => void;
}

const Aggregate: React.FC<AggregateProps> = ({ onClick }) => {
  return (
    <Card 
      className="aggregate-node" 
      tokens={{ childrenGap: 10, padding: 10 }}
      styles={{
        root: {
          border: '1px solid #0078d4', 
          borderRadius: '4px',
          width: '250px', 
          cursor: 'pointer',  
        }
      }}
      onClick={onClick} 
    >
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Right} />

      <Handle type="target" position={Position.Left} />

      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <FontIcon iconName="Merge" style={{ fontSize: 24, color: '#0078d4' }} />
        <Text variant="large">Aggregate</Text>
      </Stack>
      
      <Separator styles={{ root: { padding: '5px 0' } }} />
      
      <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="space-between">
        <Text>Group By</Text>
        <Text>Sum</Text>
      </Stack>
    </Card>
  );
};

export default Aggregate;