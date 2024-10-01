import React from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Text, Stack, Icon, Separator } from "@fluentui/react";
import { Card } from "@fluentui/react-cards";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { NodeProps } from "@xyflow/react";
import { usePanel } from "../Panels/PanelProvider";
import { AggregatePanel } from "../Panels/AggregatePanel/AggregatePanel";
import { useState, useEffect } from "react";
interface AggregateProps extends NodeProps {
  onClick?: () => void;
}

const Aggregate: React.FC<AggregateProps> = (props:any) => {
  const { openPanel } = usePanel();
  




  return (
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
        <FontIcon iconName="Merge" style={{ fontSize: 24, color: "#0078d4" }} />
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
  );
};

export default Aggregate;
