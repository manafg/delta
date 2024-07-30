import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, NodeTypes, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import PipelineHeader from '../components/pipline/PiplineHeader';
import FileReader from '../components/DrawComponents/FileReader';
import FileReaderPanel from '../components/DrawComponents/FileReaderPanel';
import { v4 as uuidv4 } from 'uuid';

const CreatePipeline = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const nodeTypes: NodeTypes = {
    file_reader: (props) => (
      <FileReader
        {...props}
        onClick={() => setIsPanelOpen(true)}
      />
    ),
  };

  const initialNodes: Node[] = [
    {
      id: uuidv4(),
      type: 'file_reader',
      position: { x: 100, y: 100 },
      data: { label: 'File Reader' },
    },
  ];

  const handlePanelDismiss = () => {
    setIsPanelOpen(false);
  };

  const handlePanelSave = (data: any) => {
    // Handle saving the panel data
    console.log('Panel data saved:', data);
    setIsPanelOpen(false);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <PipelineHeader />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
        <ReactFlow
          nodes={initialNodes}
          edges={[]}
          fitView
          nodeTypes={nodeTypes}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      <FileReaderPanel
        isOpen={isPanelOpen}
        onDismiss={handlePanelDismiss}
        onSave={handlePanelSave}
      />
    </div>
  );
};

export default CreatePipeline;