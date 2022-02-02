import React, { useState } from "react";

import {
  AntdLayout,
  Menu,
  Grid,
  Icons,
  useTranslate,
  useMenu,
  useLogout,
  useTitle,
  useNavigation,
} from "@pankod/refine";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

const { RightOutlined, LogoutOutlined } = Icons;

export const Sider: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { mutate: logout } = useLogout();
  const Title = useTitle();
  const translate = useTranslate();
  const { menuItems, selectedKey } = useMenu();
  const { push } = useNavigation();
  const breakpoint = Grid.useBreakpoint();

  const isMobile = !breakpoint.lg;

  return (
    <AntdLayout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      collapsedWidth={isMobile ? 0 : 80}
      breakpoint="lg"
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}
    >
      <Title collapsed={collapsed} />
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
        {menuItems.map(({ icon, label, route }) => {
          const isSelected = route === selectedKey;
          return (
            <Menu.Item
              style={{
                fontWeight: isSelected ? "bold" : "normal",
              }}
              key={route}
              icon={icon}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {label}
                {!collapsed && isSelected && <RightOutlined />}
              </div>
            </Menu.Item>
          );
        })}

        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          {translate("buttons.logout", "Logout")}
        </Menu.Item>
      </Menu>
    </AntdLayout.Sider>
  );
};
