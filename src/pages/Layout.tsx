import { Nav, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { Outlet } from 'react-router-dom';
import AppBar from '../components/AppBar/AppBar';

const navLinkGroups = [
  {
    links: [
      {
        name: 'Home',
        url: '/',
        icon: 'Home',
      },
      {
        name: 'Authoring',
        links: [
          {
            name: 'Pipelines',
            url: '/pipelines',
            icon: 'Page',
            links: [
              {
                name: 'Create Pipeline',
                url: '/create-pipeline',
                icon: 'Page',
              },
            ],
          },
          {
            name: 'Triggers',
            url: '/triggers',
            icon: 'LightningBolt',
          },
          {
            name: 'Alert',
            url: '/alert',
            icon: 'AlertSolid',
          },
        ],
        isExpanded: true,
      },
      {
        name: 'Monitoring',
        links: [
          {
            name: 'Pipeline Jobs',
            url: '/pipeline-jobs',
            icon: 'Processing',
          },
          {
            name: 'Real-time Jobs',
            url: '/real-time-jobs',
            icon: 'TestBeakerSolid',
          },
          {
            name: 'Alerts & Metrics',
            url: '/alerts-metrics',
            icon: 'BarChart4',
          },
        ],
        isExpanded: true,
      },
      {
        name: 'Manage',
        links: [
          {
            name: 'Triggers',
            url: '/manage-triggers',
            icon: 'LightningBolt',
          },
          {
            name: 'Connections',
            url: '/connections',
            icon: 'PlugConnected',
          },
          {
            name: 'Alerts & Metrics',
            url: '/manage-alerts-metrics',
            icon: 'BarChart4',
          },
        ],
        isExpanded: true,
      },
    ],
  },
];

const Layout = () => {
  return (
    <>
      <AppBar />

    <div className="layout" style={{ display: 'flex' }}>
      <aside className="side-panel">
        <Nav
          groups={navLinkGroups as INavLinkGroup[]}
          selectedKey="key1"
          styles={{
            root: {
              width: 200,
              height: '100vh',
              boxSizing: 'border-box',
              border: '1px solid #eee',
              overflowY: 'auto',
            },
          }}
        />
      </aside>
      <main style={{width: '100%'}} className="main-content">
        <Outlet />
      </main>
    </div>
    </>
  );
};

export default Layout;
