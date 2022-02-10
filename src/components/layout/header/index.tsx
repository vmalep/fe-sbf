import { useGetLocale, useSetLocale, useGetIdentity, useList } from "@pankod/refine-core";
import { AntdLayout, Space, Menu, Button, Icons, Dropdown, Avatar, Typography } from "@pankod/refine-antd";
import { useTranslation } from "react-i18next";

import NormalizeData from "helpers/normalizeData";

import { ISchoolYear } from "interfaces";
//import { isConstructorDeclaration } from "typescript";

const { DownOutlined } = Icons;
const { Text } = Typography;

type ISchoolYearListQueryResult = {
  options: ISchoolYear;
};

export const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity();

  const currentLocale = locale();

  const schoolYearListQueryResult = useList<ISchoolYearListQueryResult>({ resource: "school-years" });  
  const schoolYearList = NormalizeData(schoolYearListQueryResult).data;
  console.log('schoolYearSelect: ', schoolYearList);
  
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
        {user?.username && (
          <Text ellipsis strong>
            {user.username}
          </Text>
        )}
        {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
      </Space>
    </AntdLayout.Header>
  );
};
