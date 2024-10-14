import React from "react";
import {
  Panel,
  PanelType,
  IconButton,
  Stack,
  Pivot,
  PivotItem,
  IStyleFunction,
  IPanelStyles,
  DetailsList,
  IColumn,
  Spinner,
} from "@fluentui/react";
import { useDrawer } from "./DrawerContext"; // Import the context hook
import { getJobPreview } from "../api/jobPreview";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { startJob } from "../api/startJob";
import { useJobId } from "../context/GraphContext";

const DrawerPanel: React.FC = () => {
  const { isOpen, closeDrawer, unitId } = useDrawer();

  const panelStyles: IStyleFunction<{}, IPanelStyles> = () => ({
    main: {
      marginBottom: 0,
      top: "auto",
      height: "50%",
      left: "200px",
      boxShadow: "none",
      borderTop: "1px solid #eee",
      selectors: {
        "&.main-236": {
          boxShadow: "none",
        },
      },
    },
    scrollableContent: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      padding: "0",
    },
    commands: {
      display: "none",
    },
  });
  const { id } = useParams();
  const { graph, setJobId, jobId } = useJobId();
  
  const [dataPreview, setDataPreview] = useState<any[]>([]);
  const [isRefreshEnabled, setIsRefreshEnabled] = useState(true);

  const fetchDataPreview = useCallback(async () => {
    if (jobId && unitId) {
      const previewData = await getJobPreview(jobId ?? "", unitId ?? "");
      console.log("previewData", previewData);
      setDataPreview(previewData);
    }
  }, [jobId, unitId]);

  const handleStartPipeline = useCallback(async () => {
    if (id && graph) {
      const res = await startJob(id, graph, true);
      if (res.id) {
        const previewData = await getJobPreview(res.id, unitId ?? "");
        setDataPreview(previewData);
      }

      setJobId(res.id);
    }
  }, [graph, unitId, id, setJobId]);

  const handleRefreshClick = useCallback(() => {
    fetchDataPreview();
  }, [fetchDataPreview]);


  const columns: IColumn[] =
    dataPreview.length > 0
      ? Object.keys(dataPreview[0]).map((key) => ({
          key: key,
          name: key,
          fieldName: key,
          minWidth: 100,
          maxWidth: 200,
          isResizable: true,
        }))
      : [];

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
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        styles={{
          root: {
            alignItems: "flex-start",
            padding: "0 10px",
            borderBottom: "1px solid #eee",
          },
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>Data Preview </h3>
          <p style={{ fontWeight: "normal" }}>NodeID: {unitId}</p>
          {jobId ? (
            <p style={{ fontWeight: "normal" }}>JobID: {jobId}</p>
          ) : (
            <p style={{ color: "red" }}>
              No job available (Save pipeline first)
            </p>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            iconProps={{ iconName: "Refresh" }}
            onClick={handleRefreshClick}
            disabled={!isRefreshEnabled}
            styles={{
              root: {
                marginBottom: "10px",
              },
            }}
            ariaLabel="Refresh data"
          />
          <IconButton
            iconProps={{ iconName: "Play" }}
            onClick={handleStartPipeline}
            disabled={!isRefreshEnabled}
            styles={{
              root: {
                marginBottom: "10px",
                marginLeft: "10px",
              },
            }}
            ariaLabel="Generate Preview"
          />
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            onClick={closeDrawer}
            styles={{
              root: {
                marginBottom: "10px",
                marginLeft: "10px",
              },
            }}
            ariaLabel="Close"
          />
        </div>
      </Stack>
      <div style={{ padding: "20px" }}>
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
    </Panel>
  );
};

export default DrawerPanel;
