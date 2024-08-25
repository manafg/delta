import React, { useState, useEffect } from 'react';
import { Panel, PanelType, Stack, TextField, Dropdown, Toggle, SpinButton, IDropdownOption } from '@fluentui/react';
import { v4 as uuidv4 } from 'uuid';

interface FileReaderPanelProps {
  isOpen: boolean;
  nodeId: string;
  onDismiss: () => void;
  onSave: (data: FileReaderData) => void;
}

interface FileReaderData {
  id: string;
  type: string;
  output_ports: { [key: string]: string };
  options: {
    path: string;
    physical_path: string;
    share_type: string;
    authentication?: {
      username: string;
      password: string;
    };
    format: string;
    options: {
      header: string;
      inferSchema: string;
    };
    schema: {
      type: string;
      fields: Array<{
        name: string;
        type: string;
        nullable: boolean;
        metadata: {};
      }>;
    };
  };
  stream_options?: {
    enabled: boolean;
    maxFilesPerTrigger: number;
  };
}

const shareTypeOptions: IDropdownOption[] = [
  { key: 'smb', text: 'SMB' },
  { key: 'nfs', text: 'NFS' },
  { key: 'local', text: 'Local' },
];

const formatOptions: IDropdownOption[] = [
  { key: 'csv', text: 'CSV' },
  { key: 'parquet', text: 'Parquet' },
  { key: 'json', text: 'JSON' },
];

const FileReaderPanel: React.FC<FileReaderPanelProps> = ({ isOpen, onDismiss, onSave }) => {
  const [data, setData] = useState<FileReaderData>({
    id: uuidv4(),
    type: 'file_reader',
    output_ports: { main: 'main' },
    options: {
      path: '',
      physical_path: '',
      share_type: 'smb',
      format: 'csv',
      options: {
        header: 'true',
        inferSchema: 'true',
      },
      schema: {
        type: 'struct',
        fields: [],
      },
    },
  });

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      options: {
        ...prevData.options,
        path: `/mnt/data/source/${prevData.id}`,
      },
    }));
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setData(prevData => ({
      ...prevData,
      options: {
        ...prevData.options,
        [field]: value,
      },
    }));
  };

  const handleAuthToggle = (checked: boolean) => {
    setData(prevData => ({
      ...prevData,
      options: {
        ...prevData.options,
        authentication: checked ? { username: '', password: '' } : undefined,
      },
    }));
  };

  const handleAuthInputChange = (field: string, value: string) => {
    setData(prevData => ({
      ...prevData,
      options: {
        ...prevData.options,
        authentication: {
          ...prevData.options.authentication!,
          [field]: value,
        },
      },
    }));
  };

  const handleStreamOptionsToggle = (checked: boolean) => {
    setData(prevData => ({
      ...prevData,
      stream_options: checked ? { enabled: true, maxFilesPerTrigger: 1 } : undefined,
    }));
  };

  const handleStreamOptionsChange = (value: string) => {
    const numValue = parseInt(value, 10);
    setData(prevData => ({
      ...prevData,
      stream_options: {
        ...prevData.stream_options!,
        maxFilesPerTrigger: isNaN(numValue) ? 1 : Math.max(1, numValue),
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
      headerText="File Reader Configuration"
      type={PanelType.medium}
      onRenderFooterContent={() => (
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={onDismiss}>Cancel</button>
        </div>
      )}
    >
      <Stack tokens={{ childrenGap: 15 }}>
        <TextField
          label="Physical Path"
          value={data.options.physical_path}
          onChange={(_, newValue) => handleInputChange('physical_path', newValue || '')}
        />
        <Dropdown
          label="Share Type"
          selectedKey={data.options.share_type}
          options={shareTypeOptions}
          onChange={(_, option) => option && handleInputChange('share_type', option.key as string)}
        />
        <Toggle
          label="Authentication Required"
          checked={!!data.options.authentication}
          onChange={(_, checked = false) => handleAuthToggle(checked)}
        />
        {data.options.authentication && (
          <>
            <TextField
              label="Username"
              value={data.options.authentication.username}
              onChange={(_, newValue) => handleAuthInputChange('username', newValue || '')}
            />
            <TextField
              label="Password"
              type="password"
              value={data.options.authentication.password}
              onChange={(_, newValue) => handleAuthInputChange('password', newValue || '')}
            />
          </>
        )}
        <Dropdown
          label="Format"
          selectedKey={data.options.format}
          options={formatOptions}
          onChange={(_, option) => option && handleInputChange('format', option.key as string)}
        />
        <Toggle
          label="Enable Streaming"
          checked={!!data.stream_options}
          onChange={(_, checked = false) => handleStreamOptionsToggle(checked)}
        />
        {data.stream_options && (
          <SpinButton
            label="Max Files Per Trigger"
            min={1}
            step={1}
            value={data.stream_options.maxFilesPerTrigger.toString()}
            onChange={(_, newValue) => handleStreamOptionsChange(newValue || '1')}
          />
        )}
        {/* Add schema fields here */}
      </Stack>
    </Panel>
  );
};

export default FileReaderPanel;