import {
  AntdLayout,
  Space,
  Menu,
  Button,
  Icons,
  Dropdown,
  Avatar,
  Typography,
  useGetLocale,
  useSetLocale,
  useGetIdentity,
  useSelect,
  useOne,
  useList,
} from "@pankod/refine";
import { useTranslation } from "react-i18next";

import NormalizeData from "helpers/normalizeData";

import { ISchoolYear } from "interfaces";

const { DownOutlined } = Icons;
const { Text } = Typography;

interface HeaderProps {
  currSchoolYear: string;
  setCurrSchoolYear: React.Dispatch<React.SetStateAction<string>>;
}

type ISchoolYearListQueryResult = {
  options: ISchoolYear;
};

export const Header: React.FC<HeaderProps> = ({ currSchoolYear, setCurrSchoolYear }) => {
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity();

  const currentLocale = locale();

  const schoolYearTitle = useOne<ISchoolYear>({
    resource: "school-years",
    id: currSchoolYear,
  });

  // Todo: add a selection box for the school year that applies to all the records as prefilter
  const schoolYearListQueryResult = useList<ISchoolYearListQueryResult>({ resource: "school-years" });

  //console.log('school year selectProps: ', schoolYearListQueryResult);

  const schoolYearList = NormalizeData(schoolYearListQueryResult).data;
  console.log('schoolYearSelect: ', schoolYearList);

  const schoolYearMenu = (
    <Menu selectedKeys={[currentLocale]}>
      {[...(schoolYearList || [])].sort().map((schoolYear: ISchoolYear) => (
        <Menu.Item
          key={schoolYear.id}
          onClick={() => setCurrSchoolYear(schoolYear.id)
          }
        >
          {schoolYear.title}
        </Menu.Item>
      ))}
    </Menu>
  );

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
      <Dropdown overlay={schoolYearMenu}>
        <Button type="link">
          <Space>
            {currSchoolYear}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

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
