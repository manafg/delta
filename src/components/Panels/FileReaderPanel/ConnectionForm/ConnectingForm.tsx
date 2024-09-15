import { Stack, SpinButton } from "@fluentui/react";
import { InputField, DropDown, ToggleButton } from "../../../common";
import { useController, useWatch } from "react-hook-form";
import { shareTypeOptions, formatOptions } from "../types";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { PrimaryButton, DefaultButton } from "@fluentui/react";
import { useReactFlow } from "@xyflow/react";
import { usePanel } from '../../PanelProvider';

interface Props {
  cancel: () => void;
  nodeId: string;
  form: UseFormReturn<any>;
  setStep: () => void;
}

export function ConnectingForm({ nodeId,
  form,
  setStep,
  cancel,
}: Props) {
  const { control } = useFormContext();
  
  const { field: physicalPathField } = useController({ control, name: 'options.physical_path' });
  const { dismissPanel } = usePanel()
  const { updateNodeData } = useReactFlow();

  const { setValue, handleSubmit } = form;
  const data = useWatch();

  const handleStreamOptionsChange = (newValue: string) => {
    setValue(
      "stream_options.maxFilesPerTrigger",
      parseInt(newValue, 10)
    );
  };

  const onSubmit = (data: any) => {
    updateNodeData(nodeId,data);
    setStep();
  };

  const handleCancel = () => {
    dismissPanel();
  };

  return (
    <form
      autoComplete="off"
      id="fileReaderPanel"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack tokens={{ childrenGap: 15 }}>
        <InputField label="Physical Path" id="options.physical_path" {...physicalPathField} required />
        <DropDown
          name="options.share_type"
          label="Share Type"
          options={shareTypeOptions}
        />
        <ToggleButton
          label="Authentication Required"
          name="options.authentication.authRequired"
        />
        {data.options?.authentication?.authRequired && (
          <>
            <InputField
              name="options.authentication.username"
              label="Username"
              required
            />
            <InputField
              name="options.authentication.password"
              label="Password"
              type="password"
              required
            />
          </>
        )}
        <DropDown
          name="options.format"
          label="Format"
          options={formatOptions}
        />
        <ToggleButton
          label="Enable Streaming"
          name="stream_options.enabled"
        />
        {data.options?.stream_options?.enabled && (
          <SpinButton
            label="Max Files Per Trigger"
            min={1}
            step={1}
            value={data.stream_options?.maxFilesPerTrigger}
            onChange={(_, newValue) =>
              handleStreamOptionsChange(newValue || "1")
            }
          />
        )}
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <PrimaryButton text="next" type="submit" />
          <DefaultButton text="cancel" onClick={handleCancel} />
        </Stack>
      </Stack>
    </form>
  );
}
