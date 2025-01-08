import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Text, Stack, Separator, ContextualMenu, IContextualMenuProps  } from "@fluentui/react";
import { Card } from "@fluentui/react-cards";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { NodeProps } from "@xyflow/react";
import { usePanel } from "../Panels/PanelProvider";
import { useState } from "react";
import { useDrawer } from '../DrawerContext';
import { JoinPanel } from "../Panels/JoinPanel/JoinPanel";
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
      styles={{
        root: {
          border: "1px solid #0078d4",
          borderRadius: "4px",
          width: "250px",
          cursor: "pointer",
        },
      }}
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
      <Handle type="target" id="target-1" position={Position.Left} />
      <Handle type="target" id="target-2" position={Position.Left} />

      <Handle type="source" id="source-1" position={Position.Right} />

      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <svg height="24" width="24" focusable="false" viewBox="0 0 16 16">
          <path key="0" d="M6.5 8C6.5 6.672 7.086 5.492 8 4.668C7.203 3.95 6.158 3.5 5 3.5C2.515 3.5 0.5 5.515 0.5 8C0.5 10.485 2.515 12.5 5 12.5C6.158 12.5 7.203 12.05 8 11.332C7.086 10.508 6.5 9.328 6.5 8Z" style={{fill: "#ffff"}} />
          <path key="1" d="M11 3.5C9.842 3.5 8.797 3.95 8 4.668C8.914 5.492 9.5 6.672 9.5 8C9.5 9.328 8.914 10.508 8 11.332C8.797 12.05 9.842 12.5 11 12.5C13.485 12.5 15.5 10.485 15.5 8C15.5 5.515 13.485 3.5 11 3.5Z" style={{fill: "#fff"}} />
          <path key="2" d="M8 11.332C8.82843 11.332 9.5 9.84021 9.5 8C9.5 6.15979 8.82843 4.668 8 4.668C7.17157 4.668 6.5 6.15979 6.5 8C6.5 9.84021 7.17157 11.332 8 11.332Z" style={{fill: "#0078d4"}} />
          <path key="3" d="M7.264 11.292C6.619 11.737 5.841 12 5 12C2.794 12 1 10.206 1 8C1 5.794 2.794 4 5 4C5.841 4 6.619 4.263 7.264 4.708C7.486 4.455 7.731 4.226 8 4.023C7.162 3.39 6.131 3 5 3C2.239 3 0 5.239 0 8C0 10.761 2.239 13 5 13C6.131 13 7.162 12.61 8 11.977C7.731 11.774 7.486 11.545 7.264 11.292Z" style={{fill: "#0078d4"}} />
          <path key="4" d="M11 3C9.869 3 8.838 3.39 8 4.023C8.269 4.226 8.514 4.456 8.736 4.708C9.381 4.263 10.159 4 11 4C13.206 4 15 5.794 15 8C15 10.206 13.206 12 11 12C10.159 12 9.381 11.737 8.736 11.292C8.514 11.545 8.269 11.774 8 11.977C8.838 12.61 9.869 13 11 13C13.761 13 16 10.761 16 8C16 5.239 13.761 3 11 3Z" style={{fill: "#0078d4"}} />
          <path key="5" d="M8.736 4.708C8.514 4.455 8.269 4.226 8 4.023C7.731 4.226 7.486 4.455 7.264 4.708C6.487 5.589 6 6.733 6 8C6 9.267 6.487 10.411 7.264 11.292C7.486 11.545 7.731 11.774 8 11.977C8.269 11.774 8.514 11.544 8.736 11.292C9.513 10.411 10 9.267 10 8C10 6.733 9.513 5.589 8.736 4.708ZM8 10.618C7.385 9.914 7 9.005 7 8C7 6.995 7.385 6.086 8 5.382C8.615 6.086 9 6.995 9 8C9 9.005 8.615 9.914 8 10.618Z" style={{fill: "#0078d4"}} />
        </svg>
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
