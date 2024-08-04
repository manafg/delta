import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, NodeTypes, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { Panel, PanelType, IconButton, Stack, Pivot, PivotItem } from '@fluentui/react';
import PipelineHeader from '../components/pipline/PiplineHeader';
import FileReader from '../components/DrawComponents/FileReader';
import FileReaderPanel from '../components/DrawComponents/FileReaderPanel';
import { v4 as uuidv4 } from 'uuid';

const CreatePipeline = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
  const defaultViewport = { x: 0, y: 0, zoom: 1.5 }; // Adjust zoom level here

  return (
    <>
      <PipelineHeader />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', border: '0.1px ridge black' , margin: '10px'}}>
        <ReactFlow
          nodes={initialNodes}
          edges={[]}
          fitView
          nodeTypes={nodeTypes}
          defaultViewport={defaultViewport}
        >
          <Background  gap={12} size={1} color="#f1f1f1" />
          <Controls />
          <MiniMap />
        </ReactFlow>
        <IconButton
          iconProps={{ iconName: 'DoubleChevronUp' }}
          styles={{
            root: {
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              backgroundColor: '#0078d4',
              color: 'white',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
            },
            icon: {
              fontSize: '20px',
            },
          }}
          onClick={() => setIsDrawerOpen(true)}
        />
      </div>
      <FileReaderPanel
        isOpen={isPanelOpen}
        onDismiss={handlePanelDismiss}
        onSave={handlePanelSave}
      />
      <Panel
        isOpen={isDrawerOpen}
        onDismiss={() => setIsDrawerOpen(false)}
        type={PanelType.custom}
        customWidth="calc(100% - 200px)"
        isBlocking={false}
        headerText=""
        onRenderNavigationContent={() => null}
        styles={{
          main: {
            marginBottom: 0,
            top: 'auto',
            height: '50%',
            left: '200px',
          },
          scrollableContent: {
            display: 'flex',
            flexDirection: 'column',
          },
          content: {
            padding: '0',
          },
          commands: {
            display: 'none',
          },
        }}
      >
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{
          root: {
            padding: '0 10px',
            borderBottom: '1px solid #eee',
          }
        }}>
          <Pivot>
            <PivotItem headerText="Data preview" />
            <PivotItem headerText="Authoring errors" />
            <PivotItem headerText="Runtime logs" />
            <PivotItem headerText="Metrics" />
          </Pivot>
          <IconButton
            iconProps={{ iconName: 'ChevronDown' }}
            onClick={() => setIsDrawerOpen(false)}
            styles={{
              root: {
                color: '#666',
              },
            }}
          />
        </Stack>
        <div style={{ padding: '20px' }}>
          <p>This is the content of your draggable drawer.</p>
        </div>
      </Panel>
    </>
  );
};

export default CreatePipeline;