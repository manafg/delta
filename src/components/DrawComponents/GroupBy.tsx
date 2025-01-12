import React from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Text, Stack, Icon, Separator, ContextualMenu, IContextualMenuProps  } from "@fluentui/react";
import { Card } from "@fluentui/react-cards";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { NodeProps } from "@xyflow/react";
import { usePanel } from "../Panels/PanelProvider";
import { GroupByPanel } from "../Panels/GroupByPanel/GroupByPanel";
import { useState } from "react";
import { useDrawer } from '../DrawerContext';

interface GroupByProps extends NodeProps {
  onClick?: () => void;
}

const GroupBy: React.FC<GroupByProps> = (props:any) => {
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
    openPanel('groupby', <GroupByPanel nodeId={props.id} />, 'groupby', 'Group By')
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
    <>
    <Card
      className="aggregate-node"
      tokens={{ childrenGap: 10, padding: 10 }}
      styles={{
        root: {
          border: "1px solid #0078d4",
          width: "250px",
          cursor: "pointer",
        },
      }}
      onContextMenu={handleRightClick}
      onClick={() =>
        openPanel(
          "groupby",
          <GroupByPanel nodeId={props.id} />,
          "groupby",
          "Group By"
        )
      }
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <svg height="24" width="24" focusable="false" viewBox="0 0 16 16">
          <path key="0" d="M8.5 0.5H0.5V4.5H8.5V0.5Z" fill="#fff"></path>
          <path key="1" d="M8 9.479V8.5H7.75H7H2.5V12.5H10.021L10.5 12.021V11.979L8 9.479Z" fill="#fff"></path>
          <path key="2" d="M15 10V9H10.711L13.711 12L10.711 15H15V14H16V16H9V15.289L12.289 12L9 8.711V8H16V10H15Z" fill="#0078d4"></path>
          <path key="3" d="M2.85358 4.14677L2.14648 4.85387L6.14655 8.85394L6.85365 8.14684L2.85358 4.14677Z" fill="#000"></path>
          <path key="4" d="M9 0H0V5H9V0ZM8 4H1V1H8V4Z" fill="#000"></path>
          <path key="5" d="M10.521 12L10 11.479V12H3V9H8V8H2V13H9.521L10.521 12Z" fill="#000"></path>
        </svg>
        <Text variant="large">Group By</Text>
      </Stack>

      <Separator styles={{ root: { padding: "5px 0" } }} />

      <Stack
        horizontal
        tokens={{ childrenGap: 10 }}
        horizontalAlign="space-between"
      >
        <Text>Group By</Text>
        <Text>Sum</Text>
      </Stack>
    </Card>
    {menuVisible && <ContextualMenu {...menuProps} />}
    </>
  );
};

export default GroupBy;
