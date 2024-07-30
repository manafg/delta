import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { IconButton } from '@fluentui/react/lib/Button';

const PipelineHeader: React.FC = () => {
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
            key: 'input1',
            text: 'Input 1',
            onClick: () => console.log('Input 1 clicked'),
          },
          {
            key: 'input2',
            text: 'Input 2',
            onClick: () => console.log('Input 2 clicked'),
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
            key: 'output1',
            text: 'Output 1',
            onClick: () => console.log('Output 1 clicked'),
          },
          {
            key: 'output2',
            text: 'Output 2',
            onClick: () => console.log('Output 2 clicked'),
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
            key: 'operation1',
            text: 'Operation 1',
            onClick: () => console.log('Operation 1 clicked'),
          },
          {
            key: 'operation2',
            text: 'Operation 2',
            onClick: () => console.log('Operation 2 clicked'),
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
