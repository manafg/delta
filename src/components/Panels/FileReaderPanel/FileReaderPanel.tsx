import React, { useState } from "react";
import { FileReaderPanelProps } from "./types";
import {AddFields} from "./AddSchema/AddFields";
import { ConnectionFormProvider } from "./ConnectionForm/ConnectionFormProvider";

const FileReaderPanel: React.FC<FileReaderPanelProps> = ({ nodeId }) => {

  const [step, setStep] = useState(1);

  const handleCancel = () => {
    setStep(1);
  };
 
  return (
    <>
        {step === 1 && (
          <ConnectionFormProvider  setStep={()=>setStep(2)}  nodeId={nodeId} cancel={handleCancel} />
        )}
        {step === 2 && <AddFields setStep={()=>setStep(1)}  nodeId={nodeId} />}
    </>
  );
};

export default FileReaderPanel;
