import React, { useState } from 'react';
import { Panel, PanelType, Stack, TextField, Dropdown, IDropdownOption, ChoiceGroup, IChoiceGroupOption, SpinButton } from '@fluentui/react';
import { v4 as uuidv4 } from 'uuid';

interface FileWriterPanelProps {
  isOpen: boolean;
  nodeId: string;
  onDismiss: () => void;
  onSave: (data: FileWriterData) => void;
}

interface FileWriterData {
  id: string;
  component_name: string;
  path: string;
  name: string;
  serialization: string;
  authentication: string;
  username?: string;
  password?: string;
  domain?: string;
  write_mode: string;
  waiting_time?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const serializationOptions: IDropdownOption[] = [
  { key: 'json', text: 'Json' },
  { key: 'csv', text: 'CSV' },
  { key: 'parquet', text: 'Parquet' },
  { key: 'avro', text: 'Avro' },
];

const authModeOptions: IDropdownOption[] = [
  { key: 'none', text: 'None' },
  { key: 'password', text: 'Password' },
];

const writeModeOptions: IChoiceGroupOption[] = [
  { key: 'append', text: 'Append as results arrive' },
  { key: 'once', text: 'Once after all results for the time partition are available (preview)' },
];

const FileWriterPanel: React.FC<FileWriterPanelProps> = ({ isOpen, onDismiss, onSave }) => {
  const [data, setData] = useState<any>({
    id: uuidv4(),
    component_name: 'file_writer',
    path: '',
    name: '{HHmm}',
    serialization: 'json',
    authentication: 'none',
    write_mode: 'append',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAuthModeChange = (_ : any, option?: IDropdownOption) => {
    if (option) {
      setData((prevData: any) => ({
        ...prevData,
        authentication: option.key as string,
        username: option.key === 'password' ? prevData.username || '' : undefined,
        password: option.key === 'password' ? prevData.password || '' : undefined,
        domain: option.key === 'password' ? prevData.domain || '' : undefined,
      }));
    }
  };

  const handleWaitingTimeChange = (field: 'hours' | 'minutes' | 'seconds', value: string) => {
    const numValue = parseInt(value, 10);
    setData((prevData: any) => ({
      ...prevData,
      waiting_time: {
        ...prevData.waiting_time,
        [field]: isNaN(numValue) ? 0 : Math.max(0, numValue),
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
      headerText="File Writer"
      type={PanelType.medium}
      onRenderFooterContent={() => (
        <div>
          <button onClick={handleSave}>Connect</button>
          <button onClick={onDismiss}>Cancel</button>
        </div>
      )}
    >
      <Stack tokens={{ childrenGap: 15 }}>
        <TextField
          label="Path"
          value={data.path}
          onChange={(_, newValue) => handleInputChange('path', newValue || '')}
          placeholder="Enter your container"
        />
        <Dropdown
          label="Authentication mode"
          selectedKey={data.authentication}
          options={authModeOptions}
          onChange={handleAuthModeChange}
        />
        {data.authentication === 'password' && (
          <TextField
            label="Username/Password/Domain"
            value={data.username || ''}
            onChange={(_, newValue) => handleInputChange('username', newValue || '')}
            placeholder="Enter your storage account key"
          />
        )}
        <Dropdown
          label="Serialization"
          selectedKey={data.serialization}
          options={serializationOptions}
          onChange={(_, option) => option && handleInputChange('serialization', option.key as string)}
        />
        <ChoiceGroup
          label="Write mode"
          selectedKey={data.write_mode}
          options={writeModeOptions}
          onChange={(_, option) => option && handleInputChange('write_mode', option.key)}
        />
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <SpinButton
            label="Hours"
            min={0}
            step={1}
            value={(data.waiting_time?.hours || 0).toString()}
            onChange={(_, newValue) => handleWaitingTimeChange('hours', newValue || '0')}
          />
          <SpinButton
            label="Minutes"
            min={0}
            max={59}
            step={1}
            value={(data.waiting_time?.minutes || 0).toString()}
            onChange={(_, newValue) => handleWaitingTimeChange('minutes', newValue || '0')}
          />
          <SpinButton
            label="Seconds"
            min={0}
            max={59}
            step={1}
            value={(data.waiting_time?.seconds || 0).toString()}
            onChange={(_, newValue) => handleWaitingTimeChange('seconds', newValue || '0')}
          />
        </Stack>
      </Stack>
    </Panel>
  );
};

export default FileWriterPanel;