import React, { useState } from "react";
import {
  TextField,
  Dropdown,
  PrimaryButton,
  DefaultButton,
  IconButton,
  Stack,
} from "@fluentui/react";
import { useReactFlow } from "@xyflow/react";
import useAddFieldsForm from "./AddFieldsValidator";
import { FormProvider } from "react-hook-form";
import { useNodesData } from '@xyflow/react';
import { usePanel } from '../../PanelProvider';

const fieldTypes = [
  { key: "string", text: "string" },
  { key: "int", text: "int" },
  { key: "double", text: "double" },
  { key: "timestamp", text: "timestamp" },
  { key: "boolean", text: "boolean" },
];

interface Props {
  setStep: () => void;
  nodeId: string;
}

export function AddFields({ setStep, nodeId }: Props) {
  const { updateNodeData } = useReactFlow();
  const form = useAddFieldsForm(nodeId);
  const nodeData:any = useNodesData(nodeId);

  const { handleSubmit, setValue } = form;

  const [fields, setFields] = useState(nodeData?.data?.options?.schema?.fields ?? [{ name: "", type: "" }]);

  const handleAddField = () => {
    setFields([...fields, { name: "", type: "" }]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_:any, i:any) => i !== index);
    setFields(newFields);
  };

  const handleFieldChange = (index: number, key: string, value: string) => {
    const newFields = fields.map((field:any, i:any) =>
      i === index ? { ...field, [key]: value } : field
    );
    setFields(newFields);
    setValue(`options.schema.fields`, newFields); // Update form value
  };
  const { dismissPanel } = usePanel()



  const onSubmit = () => {
    const validatedData = {
        ...nodeData?.data,
        options: {
            ...nodeData?.data?.options,
            schema: {
                type: "struct",
                fields: fields.map((field:any) => ({
                    name: field.name,
                    type: field.type,
                })),
            },
        },
    };

    updateNodeData(nodeId, validatedData);
    dismissPanel();
  };



  return (
    <FormProvider {...form}>
      <form autoComplete="off" id="AddSchema" onSubmit={handleSubmit(onSubmit)}>
        <Stack tokens={{ childrenGap: 10 }}>
          {fields.map((field:any, index:any) => (
            <Stack
              horizontal
              tokens={{ childrenGap: 10 }}
              key={index}
              verticalAlign="end"
            >
              <TextField
                label="Field name"
                value={field.name}
                onChange={(e, newValue) =>
                  handleFieldChange(index, "name", newValue || "")
                }
              />
              <Dropdown
                label="Data type"
                defaultSelectedKey="int"
                selectedKey={field.type}
                options={fieldTypes}
                onChange={(e, option) =>
                  handleFieldChange(index, "type", option?.key as string)
                }
              />
              <IconButton
                iconProps={{ iconName: "Delete" }}
                title="Remove field"
                ariaLabel="Remove field"
                onClick={() => handleRemoveField(index)}
              />
            </Stack>
          ))}
          <DefaultButton
            text="Add field"
            onClick={handleAddField}
            iconProps={{ iconName: "Add" }}
          />
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <PrimaryButton text="Submit" type="submit" />
            <DefaultButton text="cancel" onClick={() => setStep()} />
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
}
