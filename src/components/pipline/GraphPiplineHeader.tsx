import React, { useEffect, useState } from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { useDnD } from '../../context/Cnavas';
import { useNodes , useEdges } from '@xyflow/react';
import { useCallback } from 'react';
import { SerlizeSchema } from './SerlizeSchema';
import { updatePipelineGraph } from '../../api/updatePipelineGraph';
import { startJob } from '../../api/startJob';
import { useJobId } from '../../context/GraphContext';
import { validatePipeline } from '../../api/validatePipline';
import { publishPipeline } from '../../api/publishPipline';
import { useAlert } from '../../context/AlertContext';
import { MessageBarType } from '@fluentui/react';
import { getPipeline } from '../../api/getPipline';
import { TextField, IconButton } from '@fluentui/react';
import { updatePipelineName } from '../../api/updatPiplineName';
interface PipelineHeaderProps {
  onAddFileReader?: () => void;
  onAddFileWriter?: () => void;
  onAddAggregate?: () => void;
  onAddJoin?: () => void;
  onAddGroupBy?: () => void;
  pipelineId?: string;
  onUpdatePipelineName?: (newName: string) => void;
}

const GraphPipelineHeader: React.FC<PipelineHeaderProps> = ({ onAddFileReader , onAddFileWriter, onAddAggregate,onAddGroupBy, onAddJoin, pipelineId, onUpdatePipelineName }) => {
  const { setGraph , graph , setJobId } = useJobId();
  const [graphData , setGraphData] = useState<string | null>(null);
  const [_, setType] = useDnD();
  const { showMessage } = useAlert();
  const nodes = useNodes();
  const edges = useEdges();
  const [isEditing, setIsEditing] = useState(false);
  const [pipelineName, setPipelineName] = useState('');
  const [newPipelineName, setNewPipelineName] = useState('');

  useEffect(() => {
    const fetchPipeline = async () => {
      if (pipelineId) {
        const res = await getPipeline(pipelineId);
        setGraphData(res.graph);
        setPipelineName(res.name);
      }
    };

    fetchPipeline();
  }, [pipelineId]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewPipelineName(pipelineName);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    if (newValue !== undefined) {
        setNewPipelineName(newValue);
    }
  };

  const handleConfirm = () => {
    if (newPipelineName.length > 0) {
      setIsEditing(false);
      setPipelineName(newPipelineName);
      if (pipelineId) {
        updatePipelineName(pipelineId, newPipelineName);
      }
    }
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string ) => {
    if (setType) {
      setType(nodeType);
    }
    event.dataTransfer.effectAllowed = 'move';
  };
  const items: ICommandBarItemProps[] = [
    {
      key: 'undo',
      text: 'Undo',
      iconProps: { iconName: 'Undo' },
      onClick: () => console.log('Undo clicked'),
    },
    {
      key: 'redo',
      text: 'Redo',
      iconProps: { iconName: 'Redo' },
      onClick: () => console.log('Redo clicked'),
    },
    {
      key: 'save',
      text: 'Save',
      iconProps: { iconName: 'Save' },
      onClick: () => handleSavePipeline(),
    },
    {
      key: 'start',
      text: 'Create Job',
      iconProps: { iconName: 'Play' },
      onClick: () => handleStartPipeline(),
    },
    {
      key: 'validate',
      text: 'Validate',
      iconProps: { iconName: 'CheckMark' },
      onClick: () => handleValidatePipeline(),
    },
    {
      key: 'publish',
      text: 'Publish',
      iconProps: { iconName: 'CloudUpload' },
      onClick: () => handlePublishPipeline(),
    },
  ];

  const handlePublishPipeline = useCallback(async () => {
    try {
      if (pipelineId) {
        const res = await publishPipeline(pipelineId);
        console.log(res);
        showMessage("Pipeline published", MessageBarType.success);
      }
    } catch (error) {
      showMessage("Failed to publish should save first", MessageBarType.error);
    }
  }, [pipelineId, showMessage]);

  const handleValidatePipeline = useCallback(async () => {
    try {
      if (pipelineId) {
        const res = await validatePipeline(pipelineId);
      console.log(res);
      showMessage("Pipeline validated", MessageBarType.success);
      }
    } catch (error) {
      showMessage("Failed to validate pipeline", MessageBarType.error);
    }
  }, [pipelineId, showMessage]);

  const handleSavePipeline = useCallback(async () => {
   const data = SerlizeSchema(nodes, edges);
    if (pipelineId) {
      try {
        const res = await updatePipelineGraph(pipelineId, data);
        setGraph(JSON.stringify(data));
        showMessage("Pipeline saved", MessageBarType.success);
      } catch (error) {
        showMessage("Failed to save pipeline", MessageBarType.error);
      }
    } 
  }, [nodes, edges , pipelineId , showMessage , setGraph]);

  const handleStartPipeline = useCallback(async () => {
    try {
      if (pipelineId && graph) {
        const res = await startJob(pipelineId, graph , false);
       setJobId(res.id);
       showMessage("Pipeline started", MessageBarType.success);
     } 
    } catch (error) {
      showMessage("Failed to start pipeline should publish first", MessageBarType.error);
    }
   }, [graph , pipelineId, showMessage , setJobId]);

  return (
    <div style={{ backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.133) 0px 3.6px 3.6px -2px, rgba(0, 0, 0, 0.11) 0px 0.3px 0.9px -0.6px' }}>
      {isEditing ? (
        <TextField
          styles={{ root: { width: '30%', padding: '10px 0px 0px 30px' } }}
          value={newPipelineName}
          onChange={handleInputChange}
          onBlur={handleConfirm}
          onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
          autoFocus
        />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={{ margin: 0, padding: '10px 0px 0px 30px' }}>{pipelineName}</h3>
          <IconButton
            style={{ margin: 0, padding: '10px 0px 0px 8px' }}
            iconProps={{ iconName: 'Edit' }}
            onClick={handleEditClick}
            ariaLabel="Edit pipeline name"
          />
        </div>
      )}
      <CommandBar
        items={items}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
    </div>
  );
};

export default GraphPipelineHeader;
