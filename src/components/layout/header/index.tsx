import { useGetLocale, useSetLocale, useGetIdentity, useLogout } from "@pankod/refine-core";
import { AntdLayout, Space, Menu, Button, Icons, Dropdown, Avatar } from "@pankod/refine-antd";
import { useTranslation } from "react-i18next";
import { AntDesignOutlined } from "@ant-design/icons";

const { DownOutlined } = Icons;

export const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity();
  const { mutate: logout } = useLogout();

  const currentLocale = locale();

  const languageMenu = (
    <Menu selectedKeys={[currentLocale]}>
      {[...(i18n.languages || [])].sort().map((lang: string) => (
        <Menu.Item
          key={lang}
          onClick={() => changeLanguage(lang)}
          icon={
            <span style={{ marginRight: 8 }}>
              <Avatar size={16} src={`/images/flags/${lang}.svg`} />
            </span>
          }
        >
          {lang === "en" ? "English" : "German"}
        </Menu.Item>
      ))}
    </Menu>
  );

  const profileMenu = (
    <Menu>
      <Menu.Item key={'logout'} onClick={() => {
        logout()
        }
      }>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
        backgroundColor: "#FFF",
      }}
    >
      <Dropdown overlay={languageMenu}>
        <Button type="link">
          <Space>
            <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
            {currentLocale === "en" ? "English" : "German"}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Space style={{ marginLeft: "8px" }}>
        <Dropdown overlay={profileMenu}>
          <Button type="link">
            <Space>
              {user?.avatar ? <Avatar size={30} src={user?.avatar} alt={user?.email} /> : <Avatar size={30} icon={<AntDesignOutlined />} />}
              {user?.id
                ? (<Button type="link" onClick={e => e.preventDefault()}>
                  {user?.firstname ? user.firstname : user.username} <DownOutlined />
                </Button>)
                : <></>}
            </Space>
          </Button>
        </Dropdown>
      </Space>
{/*       <Space style={{ marginLeft: "8px" }}>
        {user?.username && (
          <Text ellipsis strong>
            {user.username}
          </Text>
        )}
        {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
      </Space> */}
    </AntdLayout.Header>
  );
};
