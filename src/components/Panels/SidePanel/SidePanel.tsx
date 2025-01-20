import { Stack } from '@fluentui/react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';
import { useDnD } from '../../../context/Cnavas'
import { AggregateIcon } from '../../../assets/Aggregate'; 
import JoinIcon from '../../../assets/Join';
import GroupByIcon from '../../../assets/GroupBy';
import { FileArrowDown } from "@phosphor-icons/react";
import { FileArrowUp } from "@phosphor-icons/react";

const styles = {
  sidePanelTitle: {
   display: 'flex',
   gap: '10px',
   cursor: 'grab',
   alignItems: 'center'
  }
}

function SidePanel() {
    const [_, setType] = useDnD() ?? [null, null];

    const onDragStart = (type: string) => {
      if (setType) setType(type);
    };
  
    const panels: any[] = [
      {
        headerText: 'Sources',
        children: (
          <Stack tokens={{ childrenGap: 10 }}>
            <div
              draggable
              onDragStart={() => onDragStart('fileReader')}
              style={styles.sidePanelTitle}
            >
              <FileArrowUp 
               weight="fill"
               style={{ fontSize: 16, color: "#0078d4" }} 
              />
              File Reader
            </div>
          </Stack>
        )
      },
      {
        headerText: 'Operations',
        children: (
          <Stack tokens={{ childrenGap: 10 }}>
            <div
              draggable
              onDragStart={() => onDragStart('aggregate')}
              style={styles.sidePanelTitle}
            >
              <AggregateIcon  size={14} />
              Aggregate
            </div>
            <div
              draggable
              onDragStart={() => onDragStart('join')}
              style={styles.sidePanelTitle}
            >
              <JoinIcon size={16}/>
              Join
            </div>
            <div
              draggable
              onDragStart={() => onDragStart('groupby')}
              style={styles.sidePanelTitle}
            >
              <GroupByIcon size={16}/>
              Group By
            </div>
          </Stack>
        )
      },
      {
        headerText: 'Sinks',
        children: (
          <Stack tokens={{ childrenGap: 10 }}>
            <div
              draggable
              onDragStart={() => onDragStart('fileWriter')}
              style={styles.sidePanelTitle}
            >
              <FileArrowDown 
               weight="fill"
               style={{ fontSize: 16, color: "#0078d4" }} 
              />
              File Writer
            </div>
          </Stack>
        )
      },
    ]
    return <div style={{ width: '30%', height: '100%', boxShadow: '4px 0 8px -2px rgba(0, 0, 0, 0.1)', paddingLeft: '26px' ,
        fontFamily: 'Segoe UI Web (West European)',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '20px',
        letterSpacing: '0.25px',
        color: '#323130',
    }}>
        <Accordion collapsible multiple>
        {panels.map((panel, index) => (
          <AccordionItem  key={index} value={index.toString()}>
            <AccordionHeader>{panel.headerText}</AccordionHeader>
            <AccordionPanel style={{paddingLeft: '24px'}}>{panel.children}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
}

export default SidePanel;
