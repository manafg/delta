import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Background,
  BackgroundVariant
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { ActionButton } from "@fluentui/react";
import GraphPipelineHeader from "../components/pipline/GraphPiplineHeader";
import FileReader from "../components/DrawComponents/FileReader";
import Join from "../components/DrawComponents/Join";
import Aggregate from "../components/DrawComponents/Aggregate";
import FileWriter from "../components/DrawComponents/FileWriter";
import GroupBy from "../components/DrawComponents/GroupBy";
import { FloatingButton } from "../Styles";
import { Edge, Node } from "@xyflow/react";
import { DnDProvider, useDnD } from "../context/Cnavas";
import { PanelProvider } from "../components/Panels/PanelProvider";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { DeserializeSchema } from "../components/pipline/SerlizeSchema";
import { useParams } from "react-router-dom";
import { getPipeline } from "../api/getPipline";
import { DrawerProvider } from "../components/DrawerContext";
import DrawerPanel from "../components/BottomDrawer";
import { JobIdProvider } from "../context/GraphContext";
import { useJobId } from "../context/GraphContext";
const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const nodeTypes = {
  file_reader: FileReader,
  aggregate: Aggregate,
  join: Join,
  file_writer: FileWriter,
  groupby: GroupBy,
};

const getId = () => uuidv4().replace(/-/g, "");

const adjustedType = (type: string) => {
  if (type === "fileReader") {
    return "file_reader";
  }
  if (type === "aggregate") {
    return "aggregate";
  }
  if (type === "fileWriter") {
    return "file_writer";
  }
  if (type === "join") {
    return "join";
  }
  if (type === "groupby") {
    return "groupby";
  }
};

const CreatePipeline: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { setGraph } = useJobId();
  const [type] = useDnD();
  const { screenToFlowPosition } = useReactFlow();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getPipeline(id as string);
      if (res.graph) {
        setGraph(res.graph);
        const { nodes, edges } = DeserializeSchema(JSON.parse(res.graph));
        setNodes(nodes);
        setEdges(edges);
      }
    }
    fetchData();
  }, [id, setNodes, setEdges, setGraph]);

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
        type: adjustedType(type),
        position,
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="create-pipeline-container" style={{ position: 'relative', height: '100%' }}>
      <div id="pipeline-panel-container" style={{ position: 'relative', height: '100%' }}>
        <PanelProvider portalElementId="pipeline-panel-container">
          <GraphPipelineHeader pipelineId={id} />
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
          <Background color="#F9F9F9" variant={BackgroundVariant.Cross} />

          <ActionButton
            iconProps={{ iconName: "ChevronUp" }}
            onClick={toggleDrawer}
            styles={FloatingButton}
          />
          <DrawerPanel />
        </PanelProvider>
      </div>
    </div>
  );
};

const PipelineWrapper = () => {
  return (
    <ReactFlowProvider>
      <JobIdProvider>
        <DnDProvider>
          <DrawerProvider>
            <CreatePipeline />
          </DrawerProvider>
        </DnDProvider>
      </JobIdProvider>
    </ReactFlowProvider>
  );
};

export default PipelineWrapper;
