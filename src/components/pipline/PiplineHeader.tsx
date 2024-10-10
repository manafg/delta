import React , { useEffect } from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { useDnD } from '../../context/Cnavas';
import { useNodes , useEdges } from '@xyflow/react';
import { useCallback } from 'react';
import { SerlizeSchema } from './SerlizeSchema';
import { updatePipelineGraph } from '../../api/updatePipelineGraph';
import { startJob } from '../../api/startJob';
interface PipelineHeaderProps {
  onAddFileReader?: () => void;
  onAddFileWriter?: () => void;
  onAddAggregate?: () => void;
  pipelineId?: string;
  graph?: any;
}

const PipelineHeader: React.FC<PipelineHeaderProps> = ({ onAddFileReader , onAddFileWriter, onAddAggregate, pipelineId, graph}) => {

  const [_, setType] = useDnD();
  const nodes = useNodes();
  const edges = useEdges();


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
      key: 'inputs',
      text: 'Inputs',
      iconProps: { iconName: 'Add' },
      subMenuProps: {
        items: [
          {
            key: 'fileReader',
            text: 'File Reader',
            onClick: onAddFileReader,
            onRender: (item: ICommandBarItemProps) => (
              <div
                draggable
                onDragStart={(e) => onDragStart(e, 'fileReader')}
                style={{ cursor: 'move', padding: '8px' }}
              >
                {item.text}
              </div>
            ),
          },
          {
            key: 'input2',
            text: 'Input 2',
            onClick: () => console.log('Input 2 clicked'),
            onRender: (item: ICommandBarItemProps) => (
              <div
                draggable
                onDragStart={(e) => onDragStart(e, 'input2')}
                style={{ cursor: 'move', padding: '8px' }}
              >
                {item.text}
              </div>
            ),
          },
        ],
      },
    },
    {
      key: 'outputs',
      text: 'Outputs',
      iconProps: { iconName: 'Add' },
      subMenuProps: {
        items: [
          {
            key: 'fileWriter',
            text: 'File Writer',
            onClick: onAddFileWriter,
            onRender: (item: ICommandBarItemProps) => (
              <div
                draggable
                onDragStart={(e) => onDragStart(e, 'fileWriter')}
                style={{ cursor: 'move', padding: '8px' }}
              >
                {item.text}
              </div>
            ),
          },
          {
            key: 'output2',
            text: 'Output 2',
            onClick: () => console.log('Output 2 clicked'),
            onRender: (item: ICommandBarItemProps) => (
              <div
                draggable
                onDragStart={(e) => onDragStart(e, 'output2')}
                style={{ cursor: 'move', padding: '8px' }}
              >
                {item.text}
              </div>
            ),
          },
        ],
      },
    },
    {
      key: 'operations',
      text: 'Operations',
      iconProps: { iconName: 'Add' },
      subMenuProps: {
        items: [
          {
            key: 'aggregate',
            text: 'Aggregate',
            onClick: onAddAggregate,
            onRender: (item: ICommandBarItemProps) => (
              <div
                draggable
                onDragStart={(e) => onDragStart(e, 'aggregate')}
                style={{ cursor: 'move', padding: '8px' }}
              >
                {item.text}
              </div>
            ),
          },
          {
            key: 'operation2',
            text: 'Operation 2',
            onClick: () => console.log('Operation 2 clicked'),
            onRender: (item: ICommandBarItemProps) => (
              <div
                draggable
                onDragStart={(e) => onDragStart(e, 'operation2')}
                style={{ cursor: 'move', padding: '8px' }}
              >
                {item.text}
              </div>
            ),
          },
        ],
      },
    },
    {
      key: 'save',
      text: 'Save',
      iconProps: { iconName: 'Save' },
      onClick: () => handleSavePipeline(),
    },
    {
      key: 'start',
      text: 'Start',
      iconProps: { iconName: 'Play' },
      onClick: () => handleStartPipeline(),
    },
    {
      key: 'feedback',
      text: 'Feedback',
      iconProps: { iconName: 'Feedback' },
      onClick: () => console.log('Feedback clicked'),
    },
  ];

  const handleSavePipeline = useCallback(async () => {
   const data = SerlizeSchema(nodes, edges);
    if (pipelineId) {
     debugger 
      const res = await updatePipelineGraph(pipelineId, data);
      console.log('Pipeline updated', res);
    } 
    // localStorage.setItem('pipeline', JSON.stringify(data));
  }, [nodes, edges , pipelineId]);

  const handleStartPipeline = useCallback(async () => {
    debugger
     if (pipelineId && graph) {
       const res = await startJob(pipelineId, graph);
       console.log('Pipeline updated', res);
     } 
     // localStorage.setItem('pipeline', JSON.stringify(data));
   }, [graph , pipelineId]);

  return (
    <div>
      <CommandBar
        items={items}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
    </div>
  );
};

export default PipelineHeader;