import React, { useState } from 'react';
import { useNodesData } from '@xyflow/react';
import { DefaultButton, PrimaryButton, TextField, Dropdown, IDropdownOption, Stack, Label, IconButton } from '@fluentui/react';

interface AggregatePanelProps {
  nodeId: string;
  connectedNode?: any;
}

interface AggregateFunction {
  aggregation: string;
  field: string;
  filterBy: string;
  timeValue: number;
  timeUnit: string;
}

const aggregationOptions: IDropdownOption[] = [
  { key: 'sum', text: 'Sum' },
  { key: 'average', text: 'Average' },
  { key: 'min', text: 'Minimum' },
  { key: 'max', text: 'Maximum' },
  // Add more options as needed
];

const timeUnitOptions: IDropdownOption[] = [
  { key: 'Second', text: 'Second' },
  { key: 'Minute', text: 'Minute' },
  { key: 'Hour', text: 'Hour' },
  // Add more options as needed
];

export function AggregatePanel({ nodeId , connectedNode}: AggregatePanelProps) {
  const nodeData: any = useNodesData(nodeId);
  const [aggregateFunctions, setAggregateFunctions] = useState<AggregateFunction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newAggregateFunction, setNewAggregateFunction] = useState<AggregateFunction>({
    aggregation: '',
    field: '',
    filterBy: '',
    timeValue: 5,
    timeUnit: 'Second',
  });

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
      filterBy: '',
      timeValue: 5,
      timeUnit: 'Second',
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
    // Implement save functionality here
    console.log('Aggregate functions saved:', aggregateFunctions);
  };

  const options = connectedNode?.data?.options?.schema?.fields?.map((field: any) => ({ key: field.name, text: field.name }));

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
            selectedKey={newAggregateFunction.filterBy}
            onChange={(e, option) => setNewAggregateFunction({ ...newAggregateFunction, filterBy: option?.key as string })}
            options={options} // Add filter options dynamically if needed
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
            <PrimaryButton text={editIndex !== null ? "Update" : "Add"} onClick={handleAddAggregateFunction} />
            <DefaultButton text="Discard" onClick={handleDiscard} />
          </Stack>
        </Stack>
      )}
      <ul>
        {aggregateFunctions.map((func, index) => (
          <li key={index}>
            {func.aggregation} of {func.field} filtered by {func.filterBy} within the last {func.timeValue} {func.timeUnit}
            <IconButton iconProps={{ iconName: 'Edit' }} onClick={() => handleEdit(index)} />
            <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => handleDelete(index)} />
          </li>
        ))}
      </ul>
      <PrimaryButton text="Save" onClick={handleSave} />
    </div>
  );
}
