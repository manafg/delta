import { FormProvider } from "react-hook-form";
import useFileReaderForm from "./ConnetctionValidator";
import { ConnectingForm } from "./ConnectingForm";

interface Props {
  nodeId: string;
}

export function ConnectionFormProvider({ nodeId }: Props) {
  const form = useFileReaderForm(nodeId);

  return (
    <FormProvider {...form}>
      <ConnectingForm form={form} nodeId={nodeId} />
    </FormProvider>
  );
}