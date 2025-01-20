import React, { useState } from 'react';
import { Text, Stack, Separator, ContextualMenu, IContextualMenuProps } from '@fluentui/react';
import { Card } from '@fluentui/react-cards';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { FileArrowUp } from '@phosphor-icons/react';
import { usePanel } from '../Panels/PanelProvider';
import FileReaderPanel from '../Panels/FileReaderPanel/FileReaderPanel';
import { useNodesData  } from '@xyflow/react';
import { useDrawer } from '../DrawerContext';
import { useJobId } from '../../context/GraphContext';
import { handleBaseStyles, cardStyles } from './commonStyles';

interface FileReaderProps extends NodeProps {
  nodeId?: string;
}



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
  const { openDrawer } = useDrawer();

  const valid = nodeData?.data?.options?.location?.physical_path && nodeData?.data?.options?.schema?.fields?.length > 0;

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  const handlePlayButtonClick = () => {
    const jobid = localStorage.getItem('jobid');
    openDrawer(jobid ?? '', id ?? '');
    handleMenuClose();
  };

  const handleEditButtonClick = () => {
    openPanel('filereader', <FileReaderPanel nodeId={id?.toString() ?? ''} />, 'filereader', 'File Reader')
    handleMenuClose();
  };

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'play',
        text: 'Play',
        onClick: handlePlayButtonClick,
      },
      {
        key: 'edit',
        text: 'Edit',
        onClick: handleEditButtonClick,
      },
      // Add more menu items here if needed
    ],
    target: { x: menuPosition.x, y: menuPosition.y },
    onDismiss: handleMenuClose,
    directionalHintFixed: true,
  };

  return (
    <div>
      <Card
        className="file-reader-node"
        tokens={{ childrenGap: 10, padding: 10 }}
        styles={cardStyles(valid)}
        onClick={() => openPanel('filereader', <FileReaderPanel nodeId={id?.toString() ?? ''} />, 'filereader', 'File Reader')}
        onContextMenu={handleRightClick}
      >
        <Handle 
          type="source" 
          position={Position.Right} 
          style={handleBaseStyles}
        />

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

      {menuVisible && <ContextualMenu {...menuProps} />}
    </div>
  );
};

export default FileReader;