import { useState, CSSProperties } from "react";
import { useTitle, useLogout, useNavigation } from "@pankod/refine-core";
import {
  AntdLayout,
  Menu,
  Grid,
  useMenu,
  Icons,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router";

import {
  ReadOutlined
} from '@ant-design/icons';

const { LogoutOutlined } = Icons;
const { SubMenu } = Menu;

export const CustomMenu: React.FC = () => {
  const Link = routerProvider.Link;
  const Title = useTitle();
  const { menuItems, selectedKey } = useMenu();

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const breakpoint = Grid.useBreakpoint();
  const isMobile = !breakpoint.lg;
  const { mutate: logout } = useLogout();
  const { push } = useNavigation();

  return (
    <AntdLayout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      collapsedWidth={isMobile ? 0 : 80}
      breakpoint="lg"
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}
    >
      {Title && <Title collapsed={collapsed} />}
      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={({ key }) => {
          if (key === "logout") {
            logout();
            return;
          }

          if (!breakpoint.lg) {
            setCollapsed(true);
          }

          push(key as string);
        }}
      >
        <Menu.Item key="available-books" icon={<ReadOutlined />} >
          <Link to="/available-books">Available books</Link>
        </Menu.Item>
        <SubMenu key="sub1" title="Admin">
        {menuItems.map(({ icon, route, label }) => (
          <Menu.Item key={route} icon={icon}>
            <Link to={route}>{label}</Link>
          </Menu.Item>
        ))}
        </SubMenu>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </AntdLayout.Sider>
  );
};

const antLayoutSider: CSSProperties = {
  position: "relative",
};
const antLayoutSiderMobile: CSSProperties = {
  position: "fixed",
  height: "100vh",
  zIndex: 999,
};