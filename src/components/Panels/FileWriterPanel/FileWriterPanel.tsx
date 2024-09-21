import React, { useState } from "react";
import { ConnectionFormProvider } from "./ConnectionForm/ConnectionFormProvider";

interface FileWriterPanelProps {
  nodeId: string;
}

export function FileWriterPanel({ nodeId }: FileWriterPanelProps) {


  
 
  return (
    <>
          <ConnectionFormProvider    nodeId={nodeId}  />
    </>
  );
};
