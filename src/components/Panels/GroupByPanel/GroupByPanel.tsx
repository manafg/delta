import { useState, useEffect, useMemo } from 'react';
import { DefaultButton, PrimaryButton, TextField, Dropdown, IDropdownOption, Stack, Label, IconButton } from '@fluentui/react';
import { useReactFlow } from '@xyflow/react';
import { transformAggregation, reverseTransformAggregation } from './serlizer';
import { usePanel } from '../PanelProvider';
import { useJobId } from '../../../context/GraphContext';
interface GroupByPanelProps {
  nodeId: string;
}

interface GroupByFunction {
  aggregation: string;
  field: string;
  timeValue: number;
  timeUnit: string;
}

const aggregationOptions: IDropdownOption[] = [
  { key: 'sum', text: 'Sum' },
  { key: 'avg', text: 'average' },
  { key: 'min', text: 'minimum' },
  { key: 'max', text: 'maximum' },
];

const timeUnitOptions: IDropdownOption[] = [
  { key: 'second', text: 'second' },
  { key: 'minute', text: 'minute' },
  { key: 'hour', text: 'hour' },
];

const windowTypeOptions: IDropdownOption[] = [
  { key: 'tumbling', text: 'Tumbling' },
  { key: 'hopping', text: 'Hopping' },
  { key: 'sliding', text: 'Sliding' },
];

export function GroupByPanel({ nodeId }: GroupByPanelProps) {
  const [groupByFunctions, setGroupByFunctions] = useState<GroupByFunction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newGroupByFunction, setNewGroupByFunction] = useState<GroupByFunction>({
    aggregation: '',
    field: '',
    timeValue: 5,
    timeUnit: 'second',
  });
  const [windowType, setWindowType] = useState<string>('tumbling');
  const [windowDuration, setWindowDuration] = useState<number>(5);
  const [windowEvery, setWindowEvery] = useState<number>(5);
  const [windowOffset, setWindowOffset] = useState<number>(0);
  const { getEdges, getNode } = useReactFlow();
  const [connectedNode, setConnectedNode] = useState<any>(null);
  const { updateNodeData } = useReactFlow();
  const { dismissPanel } = usePanel();
  const [filterBy, setFilterBy] = useState<string[]>([]);
  
  useEffect(()=>{
    const node = getNode(nodeId);
    if (node?.data && Object.keys(node.data).length > 0) {
    const { input } = reverseTransformAggregation(node?.data);
    setGroupByFunctions(input);
    }
  },[getNode, nodeId])

  useEffect(() => {
    const edges = getEdges();
    const incomingEdge = edges.find(edge => edge.target === nodeId);
    if (incomingEdge) {
      const sourceNode:any = getNode(incomingEdge.source);
      setConnectedNode(sourceNode);
    }
  }, [getEdges, getNode, nodeId]);

  const handleAddAggregateFunction = () => {
    if (editIndex !== null) {
      const updatedFunctions = [...groupByFunctions];
      updatedFunctions[editIndex] = newGroupByFunction;
      setGroupByFunctions(updatedFunctions);
      setEditIndex(null);
    } else {
      setGroupByFunctions([...groupByFunctions, newGroupByFunction]);
    }
    setIsFormOpen(false);
    setNewGroupByFunction({
      aggregation: '',
      field: '',
      timeValue: 5,
      timeUnit: 'second',
    });
  };

  const handleDiscard = () => {
    setIsFormOpen(false);
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    setNewGroupByFunction(groupByFunctions[index]);
    setEditIndex(index);
    setIsFormOpen(true);
  };

  const handleDelete = (index: number) => {
    const updatedFunctions = groupByFunctions.filter((_, i) => i !== index);
    setGroupByFunctions(updatedFunctions);
  };

  const handleSave = () => {
    const schema = connectedNode?.data?.options?.schema?.fields;
    const transformedData = transformAggregation(groupByFunctions, schema);
    const result = {
      id: nodeId,
      type: "group_by",
      input_ports: { main: "main" },
      output_ports: { main: "main" },
      schema: {
        fields: transformedData.schema.fields.filter((field: any) => 
          filterBy.includes(field.name) || 
          groupByFunctions.some((func: any) => `${func.field}_${func.aggregation}` === field.name)
        )
      },
      options: {
        streaming: {
          filter: filterBy,
          window: {
            type: windowType,
            duration: `${windowDuration} ${newGroupByFunction.timeUnit}`,
            every: windowType === 'hopping' ? `${windowEvery} ${newGroupByFunction.timeUnit}` : undefined,
            offset: `${windowOffset} ${newGroupByFunction.timeUnit}`
          },
          aggregations: transformedData.options.streaming.aggregations,
        }
      }
    };
    console.log("result22", result);
    updateNodeData(nodeId, result);
    dismissPanel();
  };

  const options = useMemo(() => {
    return connectedNode?.data?.options?.schema?.fields?.map((field: any) => ({ key: field.name, text: field.name }));
  }, [connectedNode?.data?.options?.schema?.fields]);

  const filterByOptions = useMemo(() => {
    return options?.filter((option:any) => option.key !== newGroupByFunction.field);
  }, [options, newGroupByFunction.field]);

  const isAddDisabled = useMemo(() => {
    return !newGroupByFunction.aggregation || !newGroupByFunction.field || !newGroupByFunction.timeValue || !newGroupByFunction.timeUnit;
  }, [newGroupByFunction]);

  return (
    <div>
      <p>Calculate an aggregation (like sum or average) each time a new event occurs.</p>
      <DefaultButton text="+ Add aggregate function" onClick={() => setIsFormOpen(true)} />
      
      {isFormOpen && (
        <Stack tokens={{ childrenGap: 10 }}>
          <Label>New field</Label>
          <Dropdown
            label="Aggregation"
            selectedKey={newGroupByFunction.aggregation}
            onChange={(e, option) => setNewGroupByFunction({ ...newGroupByFunction, aggregation: option?.key as string })}
            options={aggregationOptions}
          />
          <Dropdown
            label="Field"
            selectedKey={newGroupByFunction.field}
            onChange={(e, option) => setNewGroupByFunction({ ...newGroupByFunction, field: option?.key as string })}
            options={options}
          />
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <PrimaryButton text={editIndex !== null ? "Update" : "Add"} onClick={handleAddAggregateFunction} disabled={isAddDisabled} />
            <DefaultButton text="Discard" onClick={handleDiscard} />
          </Stack>
        </Stack>
      )}

      <Stack tokens={{ childrenGap: 10 }}>
        <Label>Filter by</Label>
        <Dropdown
          label="Filter by"
          selectedKeys={filterBy}
          onChange={(e, option) => {
            const selectedKeys = option?.selected
              ? [...filterBy, option.key as string]
              : filterBy.filter(key => key !== option?.key);
            setFilterBy(selectedKeys);
          }}
          multiSelect
          options={filterByOptions}
        />
      </Stack>

      <Stack tokens={{ childrenGap: 10 }}>
        <Label>Time Window Configuration</Label>
        <Dropdown
          label="Time window"
          selectedKey={windowType}
          onChange={(e, option) => setWindowType(option?.key as string)}
          options={windowTypeOptions}
        />
        <TextField
          label="Duration"
          type="number"
          value={windowDuration.toString()}
          onChange={(e, newValue) => setWindowDuration(parseInt(newValue || '0'))}
        />
        {windowType === 'hopping' && (
          <TextField
            label="Hop size"
            type="number"
            value={windowEvery.toString()}
            onChange={(e, newValue) => setWindowEvery(parseInt(newValue || '0'))}
          />
        )}
        <TextField
          label="Offset"
          type="number"
          value={windowOffset.toString()}
          onChange={(e, newValue) => setWindowOffset(parseInt(newValue || '0'))}
        />
      </Stack>

      <ul>
        {groupByFunctions.map((func, index) => (
          <li key={index}>
            {func.aggregation} of {func.field} within the last {func.timeValue} {func.timeUnit}
            <IconButton iconProps={{ iconName: 'Edit' }} onClick={() => handleEdit(index)} />
            <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => handleDelete(index)} />
          </li>
        ))}
      </ul>
      <PrimaryButton text="Save" onClick={handleSave} />
    </div>
  );
}
