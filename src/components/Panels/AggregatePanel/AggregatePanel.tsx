import { useState, useEffect, useMemo } from 'react';
import { DefaultButton, PrimaryButton, TextField, Dropdown, IDropdownOption, Stack, Label, IconButton } from '@fluentui/react';
import { useReactFlow } from '@xyflow/react';
import { transformAggregation, reverseTransformAggregation } from './serlizer';
import { usePanel } from '../PanelProvider';

interface AggregatePanelProps {
  nodeId: string;
}

interface AggregateFunction {
  aggregation: string;
  field: string;
  filterBy: string[];
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

export function AggregatePanel({ nodeId }: AggregatePanelProps) {
  const [aggregateFunctions, setAggregateFunctions] = useState<AggregateFunction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newAggregateFunction, setNewAggregateFunction] = useState<AggregateFunction>({
    aggregation: '',
    field: '',
    filterBy: [],
    timeValue: 5,
    timeUnit: 'second',
  });

  const { getEdges, getNode, updateNodeData } = useReactFlow();
  const [connectedNode, setConnectedNode] = useState<any>(null);
  const { dismissPanel } = usePanel();
  
  useEffect(()=>{
    const node = getNode(nodeId);
    if (node?.data && Object.keys(node.data).length > 0 && reverseTransformAggregation) {
      const { input } = reverseTransformAggregation(node.data);
      setAggregateFunctions(input);
    }
  }, [getNode, nodeId])

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
      const updatedFunctions = [...aggregateFunctions];
      updatedFunctions[editIndex] = newAggregateFunction;
      setAggregateFunctions(updatedFunctions);
      setEditIndex(null);
    } else {
      setAggregateFunctions([...aggregateFunctions, newAggregateFunction]);
    }
    setIsFormOpen(false);
    setNewAggregateFunction({
      aggregation: '',
      field: '',
      filterBy: [],
      timeValue: 5,
      timeUnit: 'second',
    });
  };

  const handleDiscard = () => {
    setIsFormOpen(false);
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    setNewAggregateFunction(aggregateFunctions[index]);
    setEditIndex(index);
    setIsFormOpen(true);
  };

  const handleDelete = (index: number) => {
    const updatedFunctions = aggregateFunctions.filter((_, i) => i !== index);
    setAggregateFunctions(updatedFunctions);
  };

  const handleSave = () => {
    try {
      const result = transformAggregation(aggregateFunctions, connectedNode?.data?.options?.schema?.fields);
      if (result) {
        updateNodeData(nodeId, result);
        dismissPanel();
      }
    } catch (error) {
      console.error('Error transforming aggregation:', error);
      // You might want to show an error message to the user here
    }
  };

  const options = useMemo(() => {
    return connectedNode?.data?.options?.schema?.fields?.map((field: any) => ({ key: field.name, text: field.name }));
  }, [connectedNode]);

  const filterByOptions = useMemo(() => {
    return options?.filter((option:any) => option.key !== newAggregateFunction.field);
  }, [options, newAggregateFunction.field]);

  const isAddDisabled = useMemo(() => {
    return !newAggregateFunction.aggregation || !newAggregateFunction.field || !newAggregateFunction.timeValue || !newAggregateFunction.timeUnit;
  }, [newAggregateFunction]);

  return (
    <div>
      <p>Calculate an aggregation (like sum or average) each time a new event occurs.</p>
      <DefaultButton text="+ Add aggregate function" onClick={() => setIsFormOpen(true)} />
      {isFormOpen && (
        <Stack tokens={{ childrenGap: 10 }}>
          <Label>New field</Label>
          <Dropdown
            label="Aggregation"
            selectedKey={newAggregateFunction.aggregation}
            onChange={(e, option) => setNewAggregateFunction({ ...newAggregateFunction, aggregation: option?.key as string })}
            options={aggregationOptions}
          />
          <Dropdown
            label="Field"
            selectedKey={newAggregateFunction.field}
            onChange={(e, option) => setNewAggregateFunction({ ...newAggregateFunction, field: option?.key as string })}
            options={options} // Add field options dynamically if needed
          />
          <Dropdown
            label="Filter by"
            selectedKeys={newAggregateFunction.filterBy}
            onChange={(e, option) => {
              const selectedKeys = option?.selected
                ? [...newAggregateFunction.filterBy, option.key as string]
                : newAggregateFunction.filterBy.filter(key => key !== option?.key);
              setNewAggregateFunction({ ...newAggregateFunction, filterBy: selectedKeys });
            }}
            multiSelect
            options={filterByOptions}
          />
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <TextField
              label="Aggregate values within the last"
              type="number"
              value={newAggregateFunction.timeValue.toString()}
              onChange={(e, newValue) => setNewAggregateFunction({ ...newAggregateFunction, timeValue: parseInt(newValue || '0') })}
            />
            <Dropdown
              selectedKey={newAggregateFunction.timeUnit}
              onChange={(e, option) => setNewAggregateFunction({ ...newAggregateFunction, timeUnit: option?.key as string })}
              options={timeUnitOptions}
            />
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <PrimaryButton text={editIndex !== null ? "Update" : "Add"} onClick={handleAddAggregateFunction} disabled={isAddDisabled} />
            <DefaultButton text="Discard" onClick={handleDiscard} />
          </Stack>
        </Stack>
      )}
      <ul>
        {aggregateFunctions.map((func, index) => (
          <li key={index}>
            {func.aggregation} of {func.field} filtered by {func.filterBy.join(', ')} within the last {func.timeValue} {func.timeUnit}
            <IconButton iconProps={{ iconName: 'Edit' }} onClick={() => handleEdit(index)} />
            <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => handleDelete(index)} />
          </li>
        ))}
      </ul>
      <PrimaryButton text="Save" onClick={handleSave} />
    </div>
  );
}
