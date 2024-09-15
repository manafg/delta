import React from 'react';
import { Toggle } from '@fluentui/react';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { useFormContext, useController } from 'react-hook-form';

interface ToggleButtonProps {
  label: string;
  name: string;
  required?: boolean;
  errorMessage?: string;
}

const stackTokens: IStackTokens = { childrenGap: 10 };

const ToggleButton: React.FC<ToggleButtonProps> = ({ 
  label, 
  name,
  required = false, 
  errorMessage 
}) => {
    const { control, setValue } = useFormContext<any>();
    const { field } = useController({ control, name});
  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal verticalAlign="center" tokens={stackTokens}>
        <Toggle
          label={required ? `${label} *` : label}
          checked={field?.value ?? false}
          onChange={value => setValue(name, !field?.value)}
        />
      </Stack>
      {errorMessage && (
        <Text style={{ color: 'red', fontSize: 12 }}>{errorMessage}</Text>
      )}
    </Stack>
  );
};

export default ToggleButton;
