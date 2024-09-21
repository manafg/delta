import React from 'react';
import { Text, Stack, Separator } from '@fluentui/react';
import { Card } from '@fluentui/react-cards';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { FileArrowUp } from '@phosphor-icons/react';
import { usePanel } from '../Panels/PanelProvider';
import FileReaderPanel from '../Panels/FileReaderPanel/FileReaderPanel';
import { useNodesData  } from '@xyflow/react';

interface FileReaderProps extends NodeProps {
  nodeId?: string;
}

const cardStyles = (valid: boolean) => ({
  root: {
    border: '1px solid',
    borderColor: valid ? '#0078d4' : 'red',
    borderRadius: '4px',
    width: '250px',
    cursor: 'pointer',
  }
});

const fileArrowUpStyles = {
  fontSize: 24,
  color: '#0078d4',
};

const separatorStyles = {
  root: { padding: '5px 0' },
};

const textStyles = {
  fontSize: '14px',
  fontWeight: '500',
};

const FileReader: React.FC<FileReaderProps> = ({ id }) => {
  const nodeData: any = useNodesData(id?.toString() ?? '');
  const { openPanel } = usePanel();
  const valid = nodeData?.data?.options?.location?.physical_path && nodeData?.data?.options?.schema?.fields?.length > 0;
  
  return (
    <Card
      className="file-reader-node"
      tokens={{ childrenGap: 10, padding: 10 }}
      styles={cardStyles(valid)}
      onClick={() => openPanel('filereader', <FileReaderPanel nodeId={id?.toString() ?? ''} />, 'filereader', 'File Reader')}
    >
      <Handle type="source" position={Position.Right} />

      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <FileArrowUp weight="fill" style={fileArrowUpStyles} />
        <Text variant="large">File Reader</Text>
      </Stack>

      <Separator styles={separatorStyles} />

      <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="space-between">
        <Text style={textStyles}>{nodeData?.data?.options?.location?.physical_path ?? 'No path'}</Text>
        <Text style={{ ...textStyles, textTransform: 'capitalize' }} variant="medium">
          {nodeData?.data?.options?.location?.share_type ?? 'No type'}
        </Text>
      </Stack>
    </Card>
  );
};

export default FileReader;