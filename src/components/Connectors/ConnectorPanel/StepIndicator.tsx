import React from 'react';
import { Stack, mergeStyles, Text } from '@fluentui/react';

interface StepIndicatorProps {
  steps: { title: string }[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  const stepCircle = mergeStyles({
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 8px',
  });

  const completedStep = mergeStyles([
    stepCircle,
    {
      backgroundColor: '#0078D4',
      color: 'white',
    },
  ]);

  const activeStep = mergeStyles([
    stepCircle,
    {
      backgroundColor: '#0078D4',
      color: 'white',
      boxShadow: '0 0 0 2px white, 0 0 0 4px #0078D4',
    },
  ]);

  const pendingStep = mergeStyles([
    stepCircle,
    {
      backgroundColor: '#F3F2F1',
      color: '#605E5C',
      border: '1px solid #C8C6C4',
    },
  ]);

  const connector = mergeStyles({
    height: 2,
    flex: 1,
    backgroundColor: '#C8C6C4',
    margin: '0 4px',
  });

  const completedConnector = mergeStyles([
    connector,
    {
      backgroundColor: '#0078D4',
    },
  ]);

  return (
    <Stack tokens={{ padding: 20 }}>
      <Stack horizontal verticalAlign="center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className={index <= currentStep ? completedConnector : connector} />
            )}
            <Stack verticalAlign="center" horizontalAlign="center">
              <div className={
                index < currentStep ? completedStep :
                index === currentStep ? activeStep :
                pendingStep
              }>
                {index + 1}
              </div>
              <Text
                variant="small"
                styles={{
                  root: {
                    marginTop: 8,
                    fontWeight: index === currentStep ? '600' : 'normal',
                  },
                }}
              >
                {step.title}
              </Text>
            </Stack>
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
}; 