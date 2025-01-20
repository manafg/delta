import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect } from "react";
import { DeserializeSchema } from "../components/pipline/SerlizeSchema";
import { useParams } from "react-router-dom";
import { getJobInfo, pauseJob, resumeJob, cancelJob } from "../api/getJobInfo";
import { useState } from "react";
import { Node, Edge } from "@xyflow/react";
import { CommandBar, ICommandBarItemProps, Stack, Text } from "@fluentui/react";
import FileReader from "../components/DrawComponents/FileReader";
import Aggregate from "../components/DrawComponents/Aggregate";
import Join from "../components/DrawComponents/Join";
import FileWriter from "../components/DrawComponents/FileWriter";
import GroupBy from "../components/DrawComponents/GroupBy";
import { PanelProvider } from "../components/Panels/PanelProvider";
import { DrawerProvider } from "../components/DrawerContext";
import { useAlert } from '../context/AlertContext';
import { MessageBarType } from '@fluentui/react';
const nodeTypes = {
  file_reader: FileReader,
  aggregate: Aggregate,
  file_writer: FileWriter,
  join: Join,
  groupby: GroupBy,
};

function JobDetails() {
  const { id } = useParams();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [jobName, setJobName] = useState<string>("");
  const { showMessage } = useAlert();

  useEffect(() => {
    async function fetchData() {
      const res = await getJobInfo(id as string);
      if (res.graph) {
        const { nodes, edges } = DeserializeSchema(JSON.parse(res.graph));
        setNodes(nodes);
        setEdges(edges);
      }
      if (res.name) {
        setJobName(res.name);
      }
    }
    fetchData();
  }, [id, setNodes, setEdges]);

  const handleResume = async () => {
    try {
      await resumeJob(id as string);
      showMessage("Job resumed", MessageBarType.success);

    } catch (error) {
      showMessage("Failed to resume job", MessageBarType.error);
    }
  };

  const handlePause = async () => {
    try {
      await pauseJob(id as string);
      showMessage("Job paused", MessageBarType.success);
    } catch (error) {
      showMessage("Failed to pause job", MessageBarType.error);
    }
  };

  const handleCancel =  () => {
    try {
       cancelJob(id as string);
      showMessage("Job canceled", MessageBarType.success);
    } catch (error) {
      showMessage("Failed to cancel job", MessageBarType.error);
    }
  };

  const commandBarItems: ICommandBarItemProps[] = [
    {
      key: "resume",
      text: "Resume",
      iconProps: { iconName: "Play" },
      onClick:  handleResume,
    },
    {
      key: "pause",
      text: "Pause",
      iconProps: { iconName: "Pause" },
      onClick: handlePause,
    },
    {
      key: "cancel",
      text: "Cancel",
      iconProps: { iconName: "Cancel" },
      onClick: handleCancel,
    },
  ];

  return (
    <DrawerProvider>
      <div id="job-details-panel-container" style={{ position: 'relative', height: '100%' }}>
        <PanelProvider portalElementId="job-details-panel-container">
          <Stack horizontalAlign="start" padding={10}>
            <Text variant="xLarge">{jobName}</Text>
            <CommandBar items={commandBarItems} />
          </Stack>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgesFocusable={false}
            nodesDraggable={false}
            nodesConnectable={false}
            nodesFocusable={false}
            draggable={false}
            elementsSelectable={false}
          />
        </PanelProvider>
      </div>
    </DrawerProvider>
  );
}

export default JobDetails;
