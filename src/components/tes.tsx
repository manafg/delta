import * as React from 'react';
import { Stack, TextField, Link, Label, Dropdown, IDropdownOption, IconButton } from '@fluentui/react';

const subscriptionOptions: IDropdownOption[] = [
  { key: 'Visual Studio Enterprise Subscription', text: 'Visual Studio Enterprise Subscription' },
];

const eventSeverityOptions: IDropdownOption[] = [
  { key: 'All', text: 'All' },
];

const timespanOptions: IDropdownOption[] = [
  { key: 'Last 6 hours', text: 'Last 6 hours' },
];

const resourceGroupOptions: IDropdownOption[] = [
  { key: 'cloud-shell-storage-westeurope', text: 'cloud-shell-storage-westeurope' },
];

const resourceOptions: IDropdownOption[] = [
  { key: 'jobanalytics', text: 'jobanalytics' },
];

const LogAnalytics: React.FunctionComponent = () => {
  return (
    <Stack tokens={{ childrenGap: 10, padding: 10 }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Label>Looking for Log Analytics? <Link href="#">Visit Log Analytics</Link></Label>
        <IconButton iconProps={{ iconName: 'Cancel' }} />
      </Stack>
      <TextField placeholder="Search" />
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <Dropdown
          placeholder="Subscription"
          options={subscriptionOptions}
          defaultSelectedKey="Visual Studio Enterprise Subscription"
        />
        <Dropdown
          placeholder="Event severity"
          options={eventSeverityOptions}
          defaultSelectedKey="All"
        />
        <Dropdown
          placeholder="Timespan"
          options={timespanOptions}
          defaultSelectedKey="Last 6 hours"
        />
        <Dropdown
          placeholder="Resource group"
          options={resourceGroupOptions}
          defaultSelectedKey="cloud-shell-storage-westeurope"
        />
        <Dropdown
          placeholder="Resource"
          options={resourceOptions}
          defaultSelectedKey="jobanalytics"
        />
        <IconButton iconProps={{ iconName: 'Filter' }} text="Add Filter" />
      </Stack>
    </Stack>
  );
};

export default LogAnalytics;
