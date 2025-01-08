import { Nav, INavLinkGroup } from "@fluentui/react/lib/Nav";
import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";

const navLinkGroups = [
  {
    links: [
      {
        name: "Home",
        url: "/",
        icon: "Home",
      },
      {
        name: "Connectors",
        url: "/connectors",
        icon: "PlugDisconnected",
      },
      {
        name: "Pipelines",
        url: "/pipelines",
        icon: "OpenInNewTab",
      },
      {
        name: "Jobs",
        url: "/triggers",
        icon: "LightningBolt",
      },
      {
        name: "Alert",
        url: "/alert",
        icon: "AlertSolid",
      },
    ],
  },
];

const Layout = () => {
  return (
    <>
      <AppBar />
      <div className="layout" style={{ display: "flex" }}>
        <aside className="side-panel">
          <Nav
            groups={navLinkGroups as INavLinkGroup[]}
            selectedKey="key1"
            styles={{
              root: {
                paddingTop: 32,
                width: 180,
                boxShadow: 'rgba(0, 0, 0, 0.133) 0px 3.6px 3.6px -2px, rgba(0, 0, 0, 0.11) 0px 0.3px 0.9px -0.6px',
                height: "100vh", 
                border: "1px solid #eee",
                overflowY: "auto",
                backgroundColor: "#fff"
              },
              link: {
                height: 60,
                paddingLeft: 20,
                fontSize: 14,
                fontWeight: 500,
                
                selectors: {
                  ':hover': {
                    backgroundColor: '#f3f2f1'
                  }
                }
              },
              linkText: {
                fontSize: 14,
                marginLeft: 10
              },
            }}
          />
        </aside>
        <main style={{ width: "100%" }} className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
