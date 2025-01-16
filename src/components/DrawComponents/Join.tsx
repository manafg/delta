import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Text, Stack, Separator, ContextualMenu, IContextualMenuProps  } from "@fluentui/react";
import { Card } from "@fluentui/react-cards";
import { NodeProps } from "@xyflow/react";
import { usePanel } from "../Panels/PanelProvider";
import { useState } from "react";
import { useDrawer } from '../DrawerContext';
import { JoinPanel } from "../Panels/JoinPanel/JoinPanel";
import JoinIcon from "../../assets/Join";
import { handleBaseStyles, cardStyles } from './commonStyles';

const joinHandleStyles = {
  ...handleBaseStyles,
  left: {
    ...handleBaseStyles,
    '&::before': {
      content: '"L"',
      position: 'absolute',
      left: '-20px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '12px',
      color: '#666',
    }
  },
  right: {
    ...handleBaseStyles,
    '&::before': {
      content: '"R"',
      position: 'absolute',
      left: '-20px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '12px',
      color: '#666',
    }
  }
};

interface JoinProps extends NodeProps {
  onClick?: () => void;
}


const Join: React.FC<JoinProps> = (props:any) => {
  const { openPanel } = usePanel();
  
  const { openDrawer } = useDrawer();

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
    openDrawer(jobid ?? '', props.id ?? '');
    handleMenuClose();
  };

  const handleEditButtonClick = () => {
    openPanel('join', <JoinPanel nodeId={props.id} />, 'join', 'Join')
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
    ],
    target: { x: menuPosition.x, y: menuPosition.y },
    onDismiss: handleMenuClose,
    directionalHintFixed: true,
  };



  return (
    <>
    <Card
      className="join-node"
      tokens={{ childrenGap: 10, padding: 10 }}
      styles={cardStyles(true)}
      onContextMenu={handleRightClick}
      onClick={() =>
        openPanel(
          "join",
          <JoinPanel nodeId={props.id} />,
          "join",
          "Join"
        )
      }
    >
      <Handle 
        style={joinHandleStyles.right} 
        type="target" 
        id="target-1" 
        position={Position.Left} 
        className="right-handle"
      />
      <Handle 
        style={{...joinHandleStyles.left, top: '70%'}} 
        type="target" 
        id="target-2" 
        position={Position.Left} 
        className="left-handle"
      />

      <Handle type="source" id="source-1" position={Position.Right} style={handleBaseStyles} />

      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <JoinIcon />
        <Text variant="large">Join</Text>
      </Stack>

      <Separator styles={{ root: { padding: "5px 0" } }} />

      <Stack
        horizontal
        tokens={{ childrenGap: 10 }}
        horizontalAlign="space-between"
      >
        <Text>Join</Text>
        <Text>Join</Text>
      </Stack>
    </Card>
    {menuVisible && <ContextualMenu {...menuProps} />}
    </>
  );
};

export default Join;
