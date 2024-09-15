import React from 'react';
import { TextField, ITextFieldProps, TooltipHost, ITooltipHostProps } from '@fluentui/react';
import { Info } from '@phosphor-icons/react';
import { Controller, useFormContext, useController, useWatch } from 'react-hook-form';

interface InputFieldProps extends ITextFieldProps {
  label: string;
  tooltip?: string;
  required?: boolean;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  tooltip,
  required,
  error,
  ...props
}) => {
  const renderLabel = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {label}
      {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
      {tooltip && (
        <TooltipHost content={tooltip} {...tooltipHostProps}>
          <Info size={16} style={{ marginLeft: '4px', cursor: 'help' }} />
        </TooltipHost>
      )}
    </div>
  );

  const tooltipHostProps: ITooltipHostProps = {
    calloutProps: { gapSpace: 0 },
    styles: { root: { display: 'inline-block' } },
  };


  return (
    <TextField
      onRenderLabel={renderLabel}
      required={required}
      errorMessage={error}
      {...props}
    />
  );
};
