import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useNodes,
  useEdges,
  addEdge,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { ActionButton } from "@fluentui/react";
import PipelineHeader from "../components/pipline/PiplineHeader";
import FileReader from "../components/DrawComponents/FileReader";
import Aggregate from "../components/DrawComponents/Aggregate";
import FileWriter from "../components/DrawComponents/FileWriter";
import BottomDrawer from "../components/BottomDrawer";
import { FloatingButton } from "../Styles";
import { Edge, Node } from "@xyflow/react";
import { DnDProvider, useDnD } from "../context/Cnavas";
import { PanelProvider } from "../components/Panels/PanelProvider";
import { v4 as uuidv4 } from "uuid";

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const nodeTypes = {
  fileReader: FileReader,
  aggregate: Aggregate,
  fileWriter: FileWriter,
};

const getId = () => uuidv4();

const CreatePipeline = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [type] = useDnD();
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (typeof type !== "string" || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newId = getId();
      const newNode = {
        id: newId,
        type,
        position,
        data: { label: `${type} node`, id: newId },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  return (
    <>
      <PipelineHeader />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
      />
      <ActionButton
        iconProps={{ iconName: "ChevronUp" }}
        onClick={toggleDrawer}
        styles={FloatingButton}
      />
      <BottomDrawer isOpen={isDrawerOpen} onDismiss={toggleDrawer} />
    </>
  );
};

export default () => {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <PanelProvider>
          <CreatePipeline />
        </PanelProvider>
      </DnDProvider>
    </ReactFlowProvider>
  );
};
