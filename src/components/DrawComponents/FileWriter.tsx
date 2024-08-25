import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Text, Stack, Separator } from '@fluentui/react';
import { Card } from '@fluentui/react-cards';
import { NodeProps } from '@xyflow/react';
import {  FileArrowDown } from '@phosphor-icons/react';

interface FileWriterProps extends NodeProps {
  onClick?: () => void;
}

const FileWriter: React.FC<FileWriterProps> = ({ onClick }) => {
  return (
    <Card 
      className="file-writer-node" 
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
      <Handle type="target" position={Position.Left} />
      
      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <FileArrowDown weight='fill' style={{ fontSize: 24, color: '#0078d4' }} />
        <Text variant="large">File Writer</Text>
      </Stack>
      
      <Separator styles={{ root: { padding: '5px 0' } }} />
      
      <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="space-between">
        <Text>Output</Text>
        <Text>CSV</Text>
      </Stack>
    </Card>
  );
};

export default FileWriter;