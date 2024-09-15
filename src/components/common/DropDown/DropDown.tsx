import React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Label } from '@fluentui/react/lib/Label';
import { Stack } from '@fluentui/react/lib/Stack';
import { useFormContext, useController } from 'react-hook-form';

interface DropDownProps {
  label: string;
  name: string;
  options: IDropdownOption[];
  selectedKey?: string | number;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
}

export const DropDown: React.FC<DropDownProps> = ({
  label,
  options,
  name,
  placeholder,
  required = false,
  errorMessage,
}) => {
    const { control, setValue } = useFormContext<any>();
    const { field } = useController({ control, name});
  return (
    <Stack tokens={{ childrenGap: 5 }}>
      <Label required={required}>{label}</Label>
      <Dropdown
        placeholder={placeholder}
        options={options}
        selectedKey={field?.value ?? ''}
        onChange={(event, option) => {
            debugger
            setValue(name, option?.key)}}
        errorMessage={errorMessage}
      />
    </Stack>
  );
};
