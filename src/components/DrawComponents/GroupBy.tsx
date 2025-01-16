import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Text, Stack, Separator, ContextualMenu, IContextualMenuProps  } from "@fluentui/react";
import { Card } from "@fluentui/react-cards";
import { NodeProps } from "@xyflow/react";
import { usePanel } from "../Panels/PanelProvider";
import { GroupByPanel } from "../Panels/GroupByPanel/GroupByPanel";
import { useState } from "react";
import { useDrawer } from '../DrawerContext';
import GroupByIcon from '../../assets/GroupBy';
import { handleBaseStyles, cardStyles } from './commonStyles';
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
      tokens={{ childrenGap: 10, padding: 10  }}
      styles={cardStyles(true)}
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
      <Handle style={handleBaseStyles} type="target" position={Position.Left} />
      <Handle style={handleBaseStyles} type="source" position={Position.Right} />

      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <GroupByIcon />
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
