import React from 'react';
import { Text, Stack, Icon, Separator } from '@fluentui/react';
import { Card } from '@fluentui/react-cards';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { FileArrowUp, } from '@phosphor-icons/react';

interface FileReaderProps extends NodeProps {
  onClick?: () => void;
}

const FileReader: React.FC<FileReaderProps> = ({ onClick }) => {
  return (
    <Card 
      className="file-reader-node" 
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
      
      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <FileArrowUp weight="fill" style={{ fontSize: 24, color: '#0078d4' }} />
        <Text variant="large">File Reader</Text>
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