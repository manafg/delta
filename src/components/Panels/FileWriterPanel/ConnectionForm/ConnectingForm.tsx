import { Stack, SpinButton } from "@fluentui/react";
import { InputField, DropDown, ToggleButton } from "../../../common";
import { useController, useWatch } from "react-hook-form";
import { shareTypeOptions, formatOptions } from "../types";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { PrimaryButton, DefaultButton } from "@fluentui/react";
import { useReactFlow } from "@xyflow/react";
import { usePanel } from '../../PanelProvider';

interface Props {
  nodeId: string;
  form: UseFormReturn<any>;
}

export function ConnectingForm({ nodeId,
  form,
}: Props) {
  const { control } = useFormContext();
  
  const { field: physicalPathField } = useController({ control, name: 'options.location.physical_path' });
  const { field: pathField } = useController({ control, name: 'options.location.path' });
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
    data.options.location.path = `/mnt/data/source/${nodeId}`;
    updateNodeData(nodeId,data);
  };

  const handleCancel = () => {
    dismissPanel();
  };

  console.log(form.formState.errors);

  return (
    <form
      autoComplete="off"
      id="fileReaderPanel"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack tokens={{ childrenGap: 15 }}>
        <InputField readOnly value={`/mnt/data/source/${nodeId}`} label="Path" id="options.location.path" />
        <InputField label="Physical Path" id="options.location.physical_path" {...physicalPathField} required />
        <DropDown
          name="options.location.share_type"
          label="Share Type"
          options={shareTypeOptions}
        />
        <ToggleButton
          label="Authentication Required"
          name="options.location.authentication.authRequired"
        />
        {data.options?.location?.authentication?.authRequired && (
          <>
            <InputField
              name="options.location.authentication.username"
              label="Username"
              required
            />
            <InputField
              name="options.location.authentication.password"
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
        <DropDown
          name="options.options.header"
          label="Header"
          options={[
            { key: 'true', text: 'True' },
            { key: 'false', text: 'False' },
          ]}
        />
        <DropDown
          name="options.options.inferSchema"
          label="Infer Schema"
          options={[
            { key: 'true', text: 'True' },
            { key: 'false', text: 'False' },
          ]}
        />
        <ToggleButton
          label="Enable Streaming"
          name="stream_options.enabled"
        />
        <SpinButton
          label="Max Files Per Trigger"
          min={1}
          step={1}
          value={data.stream_options?.maxFilesPerTrigger}
          onChange={(_, newValue) =>
            handleStreamOptionsChange(newValue || "1")
          }
        />
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <PrimaryButton text="Save" type="submit" />
          <DefaultButton text="cancel" onClick={handleCancel} />
        </Stack>
      </Stack>
    </form>
  );
}
