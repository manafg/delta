import React from 'react';
import { Panel, PanelType, IconButton, Stack, Pivot, PivotItem, IStyleFunction, IPanelStyles, DetailsList, IColumn } from '@fluentui/react';
import { useDrawer } from './DrawerContext'; // Import the context hook
import { getJobPreview } from '../api/jobPreview';
import { useState, useEffect } from 'react';

const DrawerPanel: React.FC = () => {
  const { isOpen, closeDrawer, jobId, unitId } = useDrawer();

  const panelStyles: IStyleFunction<{}, IPanelStyles> = () => ({
    main: {
      marginBottom: 0,
      top: 'auto',
      height: '50%',
      left: '200px',
      boxShadow: 'none',
      borderTop: '1px solid #eee',
      selectors: {
        '&.main-236': {
          boxShadow: 'none',
        },
      },
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
  });

  const [dataPreview, setDataPreview] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen && jobId && unitId) {
      const fetchDataPreview = async () => {
        const previewData = await getJobPreview(jobId ?? '', unitId ?? '');
        console.log('previewData', previewData)
        setDataPreview(previewData);
      };

      fetchDataPreview();
    }
  }, [isOpen, jobId, unitId]);

  const columns: IColumn[] = dataPreview.length > 0 ? Object.keys(dataPreview[0]).map(key => ({
    key: key,
    name: key,
    fieldName: key,
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  })) : [];

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={closeDrawer}
      type={PanelType.custom}
      customWidth="calc(100% - 200px)"
      isBlocking={false}
      headerText=""
      onRenderNavigationContent={() => null}
      styles={panelStyles}
    >
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{
        root: {
          padding: '0 10px',
          borderBottom: '1px solid #eee',
        }
      }}>
        <Pivot>
          <PivotItem headerText="Data preview">
            <div style={{ padding: '20px' }}>
              {dataPreview.length > 0 ? (
                <DetailsList
                  items={dataPreview}
                  columns={columns}
                  setKey="set"
                  layoutMode={0}
                  selectionPreservedOnEmptyClick={true}
                  ariaLabelForSelectionColumn="Toggle selection"
                  ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                  checkButtonAriaLabel="Row checkbox"
                />
              ) : (
                <p>No data available</p>
              )}
            </div>
          </PivotItem>
          <PivotItem headerText="Authoring errors" />
          <PivotItem headerText="Runtime logs" />
          <PivotItem headerText="Metrics" />
        </Pivot>
        <IconButton
          iconProps={{ iconName: 'ChevronDown' }}
          onClick={closeDrawer}
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
  );
};

export default DrawerPanel;