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
            name: 'Jobs',
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
