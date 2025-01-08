import React from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Text, Stack, Icon, Separator, ContextualMenu, IContextualMenuProps  } from "@fluentui/react";
import { Card } from "@fluentui/react-cards";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { NodeProps } from "@xyflow/react";
import { usePanel } from "../Panels/PanelProvider";
import { AggregatePanel } from "../Panels/AggregatePanel/AggregatePanel";
import { useState } from "react";
import { useDrawer } from '../DrawerContext';

interface AggregateProps extends NodeProps {
  onClick?: () => void;
}

const Aggregate: React.FC<AggregateProps> = (props:any) => {
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
    openPanel('aggregate', <AggregatePanel nodeId={props.id} />, 'aggregate', 'Aggregate')
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
          "aggregate",
          <AggregatePanel nodeId={props.id} />,
          "aggregate",
          "Aggregate"
        )
      }
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
      <svg height="24" width="24" focusable="false" viewBox="0,0,2048,2048" style={{color: "#0078d4"}}>
          <path key="0" className="OfficeIconColors_HighContrast" d="M 1664 384 v -128 h -1189 l 768 768 l -768 768 h 1189 v -128 h 128 v 256 h -1536 v -91 l 805 -805 l -805 -805 v -91 h 1536 v 256 z"></path>
          <path key="1" className="OfficeIconColors_m22" d="M 1664 384 v -128 h -1189 l 768 768 l -768 768 h 1189 v -128 h 128 v 256 h -1536 v -91 l 805 -805 l -805 -805 v -91 h 1536 v 256 z"></path>
        </svg>
        <Text variant="large">Aggregate</Text>
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

export default Aggregate;
