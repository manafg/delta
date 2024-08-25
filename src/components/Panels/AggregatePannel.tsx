import React, { useState, useEffect } from 'react';
import { Panel, PanelType, Stack, TextField, Dropdown, Toggle, SpinButton, IDropdownOption } from '@fluentui/react';
import { v4 as uuidv4 } from 'uuid';

interface AggregateDrawerProps {
  isOpen: boolean;
  nodeId: string;
  onDismiss: () => void;
  onSave: (data: AggregateData) => void;
}

interface AggregateData {
  id: string;
  type: string;
  input_ports: { [key: string]: string };
  output_ports: { [key: string]: string };
  options: {
    aggregations: Array<{ [key: string]: string }>;
    groupByCols: string[];
    streaming?: {
      timestampCol: string;
      interval: string;
    };
  };
}

const AggregateDrawer: React.FC<AggregateDrawerProps> = ({ isOpen, onDismiss, onSave }) => {
  const [data, setData] = useState<AggregateData>({
    id: uuidv4(),
    type: 'aggregate',
    input_ports: { main: 'main' },
    output_ports: { main: 'main' },
    options: {
      aggregations: [{ Toll: 'min' }],
      groupByCols: [],
    },
  });

  const handleAggregationChange = (index: number, field: string, func: string) => {
    setData(prevData => ({
      ...prevData,
      options: {
        ...prevData.options,
        aggregations: prevData.options.aggregations.map((agg, i) => 
          i === index ? { [field]: func } : agg
        ),
      },
    }));
  };

  const handleGroupByColsChange = (cols: string[]) => {
    setData(prevData => ({
      ...prevData,
      options: {
        ...prevData.options,
        groupByCols: cols,
      },
    }));
  };

  const handleStreamingToggle = (checked: boolean) => {
    setData(prevData => ({
      ...prevData,
      options: {
        ...prevData.options,
        streaming: checked ? { timestampCol: '', interval: '' } : undefined,
      },
    }));
  };

  const handleStreamingChange = (field: string, value: string) => {
    setData(prevData => ({
      ...prevData,
      options: {
        ...prevData.options,
        streaming: {
          ...prevData.options.streaming!,
          [field]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    onSave(data);
    onDismiss();
  };

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText="Aggregate Configuration"
      type={PanelType.medium}
      onRenderFooterContent={() => (
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={onDismiss}>Cancel</button>
        </div>
      )}
    >
      <Stack tokens={{ childrenGap: 15 }}>
        {data.options.aggregations.map((agg, index) => (
          <Stack horizontal key={index} tokens={{ childrenGap: 10 }}>
            <TextField
              label={index === 0 ? "Field" : ""}
              value={Object.keys(agg)[0]}
              onChange={(_, newValue) => handleAggregationChange(index, newValue || '', Object.values(agg)[0])}
            />
            <Dropdown
              label={index === 0 ? "Aggregation Function" : ""}
              selectedKey={Object.values(agg)[0]}
              options={[
                { key: 'min', text: 'Min' },
                { key: 'max', text: 'Max' },
                { key: 'sum', text: 'Sum' },
                { key: 'avg', text: 'Average' },
                { key: 'count', text: 'Count' },
              ]}
              onChange={(_, option) => option && handleAggregationChange(index, Object.keys(agg)[0], option.key as string)}
            />
          </Stack>
        ))}
        <button onClick={() => setData(prevData => ({
          ...prevData,
          options: {
            ...prevData.options,
            aggregations: [...prevData.options.aggregations, { '': 'min' }],
          },
        }))}>
          Add Aggregation
        </button>

        <TextField
          label="Group By Columns"
          value={data.options.groupByCols.join(', ')}
          onChange={(_, newValue) => handleGroupByColsChange(newValue ? newValue.split(',').map(s => s.trim()) : [])}
        />

        <Toggle
          label="Enable Streaming"
          checked={!!data.options.streaming}
          onChange={(_, checked = false) => handleStreamingToggle(checked)}
        />
        {data.options.streaming && (
          <>
            <TextField
              label="Timestamp Column"
              value={data.options.streaming.timestampCol}
              onChange={(_, newValue) => handleStreamingChange('timestampCol', newValue || '')}
            />
            <TextField
              label="Interval"
              value={data.options.streaming.interval}
              onChange={(_, newValue) => handleStreamingChange('interval', newValue || '')}
            />
          </>
        )}
      </Stack>
    </Panel>
  );
};

export default AggregateDrawer;