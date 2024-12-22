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
          borderRadius: "4px",
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
        <FontIcon iconName="Merge" style={{ fontSize: 24, color: "#0078d4" }} />
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
