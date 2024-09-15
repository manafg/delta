import { IDropdownOption } from "@fluentui/react";

interface FileReaderPanelProps {
  nodeId: string;
}

interface FileReaderData {
  id: string;
  type: string;
  output_ports: { [key: string]: string };
  options: {
    path: string;
    physical_path: string;
    share_type: string;
    authentication: {
      username?: string;
      password?: string;
    } | null;
    format: string;
    options: {
      header: string;
      inferSchema: string;
    };
    schema: {  // Move schema inside options
        type: string,
        fields: Array<{
          name: string;
          type: string;
          nullable: boolean;
          metadata: {};
        }>,
      },
    // Remove the schema property
  };
  stream_options?: {
    enabled: boolean;
    maxFilesPerTrigger: number;
  };
}

const shareTypeOptions: IDropdownOption[] = [
  { key: "smb", text: "SMB" },
  { key: "nfs", text: "NFS" },
  { key: "local", text: "Local" },
];

const formatOptions: IDropdownOption[] = [
  { key: "csv", text: "CSV" },
  { key: "parquet", text: "Parquet" },
  { key: "json", text: "JSON" },
];

export { shareTypeOptions, formatOptions };

export type { FileReaderPanelProps, FileReaderData };