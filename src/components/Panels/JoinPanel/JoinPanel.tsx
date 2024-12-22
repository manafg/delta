import { useState, useEffect, useMemo } from "react";
import {
  Dropdown,
  IDropdownOption,
  ChoiceGroup,
  IChoiceGroupOption,
  TextField,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import { useReactFlow } from "@xyflow/react";
import { usePanel } from "../PanelProvider";
interface JoinPanelProps {
  nodeId: string;
}

export function JoinPanel({ nodeId }: JoinPanelProps) {
  const [fieldPairs, setFieldPairs] = useState<
    { left: string; right: string }[]
  >([{ left: "", right: "" }]);
  const [joinType, setJoinType] = useState<string | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<string>("5");
  const [timeUnit, setTimeUnit] = useState<string>("Second");
  const { getEdges, getNode } = useReactFlow();
  const [connectedNode_1, setConnectedNode_1] = useState<any>(null);
  const [connectedNode_2, setConnectedNode_2] = useState<any>(null);
  const { updateNodeData } = useReactFlow();
  const { dismissPanel } = usePanel();

  const fieldOptions: IDropdownOption[] = [
    { key: "field1", text: "Field 1" },
    { key: "field2", text: "Field 2" },
    // Add more fields as needed
  ];

  useEffect(() => {
    const edges = getEdges();
    const incomingEdges = edges.filter((edge) => edge.target === nodeId);
    if (incomingEdges.length > 0) {
      const sourceNode_1: any = getNode(incomingEdges[0].source);
      const sourceNode_2: any = getNode(incomingEdges[1].source);
      setConnectedNode_1(sourceNode_1);
      setConnectedNode_2(sourceNode_2);
    }
  }, [getEdges, getNode, nodeId]);

  const joinTypeOptions: IChoiceGroupOption[] = [
    { key: "inner", text: "Inner" },
    { key: "left", text: "Left" },
    { key: "outputSchema", text: "Output Schema" }, // New option
  ];
  const options = useMemo(() => {
    return connectedNode_1?.data?.options?.schema?.fields?.map(
      (field: any) => ({ key: field.name, text: field.name })
    );
  }, [connectedNode_1?.data?.options?.schema?.fields]);

  const options_2 = useMemo(() => {
    return connectedNode_2?.data?.options?.schema?.fields?.map(
      (field: any) => ({ key: field.name, text: field.name })
    );
  }, [connectedNode_2?.data?.options?.schema?.fields]);

  const timeUnitOptions: IDropdownOption[] = [
    { key: "Second", text: "Second" },
    { key: "Minute", text: "Minute" },
    // Add more units as needed
  ];

  const isDoneDisabled =
    fieldPairs.some((pair) => !pair.left || !pair.right) || !joinType;

  function serialize() {
    return {
      id: nodeId, // Assuming nodeId is a UUID
      type: "join",
      input_ports: {
        left: "left",
        right: "right",
      },
      output_ports: {
        main: "main",
      },
      options: {
        join_columns: fieldPairs.map((pair) => ({
          left: pair.left || "<column_name>",
          right: pair.right || "<column_name>",
        })),
        join_type: joinType || "left",
        schema: {
          fields: [
            ...(connectedNode_1?.data?.options?.schema?.fields?.map((field: any) => ({
              ...field,
              name: `left_${field.name}`
            })) || []),
            ...(connectedNode_2?.data?.options?.schema?.fields?.map((field: any) => ({
              ...field, 
              name: `right_${field.name}`
            })) || [])
          ],
        },
      },
      stream_options: {
        enabled: true,
        interval: `${timeValue} ${timeUnit.toLowerCase()}`,
      },
    };
  }

  const handleDone = () => {
    const joinSettings = serialize();
    console.log("joinSettings", joinSettings);
    
    updateNodeData(nodeId, joinSettings);
    dismissPanel();
  };

  const addFieldPair = () =>
    setFieldPairs([...fieldPairs, { left: "", right: "" }]);

  const handleFieldChange = (
    index: number,
    side: "left" | "right",
    key: string
  ) => {
    const newFieldPairs = [...fieldPairs];
    newFieldPairs[index][side] = key;
    setFieldPairs(newFieldPairs);
  };

  return (
    <div>
      <h2>Join</h2>
      <p>
        Combine events from two inputs based on the field pairs you select. If
        you don't select a field pair, the join will be based on time.
      </p>

      {fieldPairs.map((pair, index) => (
        <Stack
          key={`pair-${index}`}
          horizontal
          tokens={{ childrenGap: 10 }}
          verticalAlign="end"
          style={{ marginBottom: 10 }}
        >
          <Dropdown
            label={`Left ${index + 1}`}
            options={options}
            styles={{ dropdown: { width: 200 } }}
            selectedKey={pair.left}
            onChange={(e, option) =>
              handleFieldChange(index, "left", option?.key as string)
            }
          />
          <Dropdown
            label={`Right ${index + 1}`}
            options={options_2}
            styles={{ dropdown: { width: 200 } }}
            selectedKey={pair.right}
            onChange={(e, option) =>
              handleFieldChange(index, "right", option?.key as string)
            }
          />
        </Stack>
      ))}
      <PrimaryButton text="Add Field Pair" onClick={addFieldPair} />

      <ChoiceGroup
        label="Type"
        options={joinTypeOptions}
        selectedKey={joinType}
        onChange={(e, option) => setJoinType(option?.key)}
      />

      <TextField
        label="Join all events within the last"
        value={timeValue}
        onChange={(e, newValue) => setTimeValue(newValue || "5")}
      />

      <Dropdown
        options={timeUnitOptions}
        selectedKey={timeUnit}
        onChange={(e, option) => setTimeUnit(option?.key as string)}
      />

      <PrimaryButton
        text="Done"
        onClick={handleDone}
        disabled={isDoneDisabled}
      />
    </div>
  );
}
