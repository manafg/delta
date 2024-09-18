import React from 'react';
import { Text, Stack, Separator } from '@fluentui/react';
import { Card } from '@fluentui/react-cards';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { FileArrowUp, } from '@phosphor-icons/react';
import { usePanel } from '../Panels/PanelProvider';
import FileReaderPanel from '../Panels/FileReaderPanel/FileReaderPanel'
import { useNodesData } from '@xyflow/react';

interface FileReaderProps extends NodeProps {
  nodeId?: string;
}


const FileReader: React.FC<FileReaderProps> = ({id}) => {
  const nodeData:any = useNodesData(id?.toString() ?? '');
  const { openPanel } = usePanel();
  console.log('nodeData',nodeData)
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
      onClick={() => openPanel('filereader', <FileReaderPanel nodeId={id?.toString() ?? ''} />, 'filereader', 'File Reader')} 
    >
      <Handle type="source" position={Position.Right} />
      
      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <FileArrowUp weight="fill" style={{ fontSize: 24, color: '#0078d4' }} />
        <Text variant="large">File Reader</Text>
      </Stack>
      
      <Separator styles={{ root: { padding: '5px 0' } }} />
      
      <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="space-between">
        <Text>{nodeData?.data?.options?.physical_path ?? 'No path'}</Text>
        <Text>{nodeData?.data?.options?.share_type ?? 'No type'}</Text>
      </Stack>
    </Card>
  );
};

export default FileReader;