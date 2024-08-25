import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { useDnD } from '../../context/Cnavas';
interface PipelineHeaderProps {
  onAddFileReader?: () => void;
  onAddFileWriter?: () => void;
  onAddAggregate?: () => void;
}

const PipelineHeader: React.FC<PipelineHeaderProps> = ({ onAddFileReader , onAddFileWriter, onAddAggregate}) => {
  const [_, setType] = useDnD();
  
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
      onClick: () => console.log('Save clicked'),
    },
    {
      key: 'start',
      text: 'Start',
      iconProps: { iconName: 'Play' },
      onClick: () => console.log('Start clicked'),
    },
    {
      key: 'feedback',
      text: 'Feedback',
      iconProps: { iconName: 'Feedback' },
      onClick: () => console.log('Feedback clicked'),
    },
  ];

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