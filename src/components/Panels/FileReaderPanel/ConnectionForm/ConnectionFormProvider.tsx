import { FormProvider } from "react-hook-form";
import useFileReaderForm from "./ConnetctionValidator";
import { ConnectingForm } from "./ConnectingForm";

interface Props {
  nodeId: string;
  setStep: () => void;
  cancel: () => void;
}

export function ConnectionFormProvider({ nodeId, setStep, cancel }: Props) {
  const form = useFileReaderForm(nodeId);

  return (
    <FormProvider {...form}>
      <ConnectingForm form={form} nodeId={nodeId} setStep={setStep} cancel={cancel} />
    </FormProvider>
  );
}