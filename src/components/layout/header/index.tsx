import { useContext } from "react";
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
  useList,
} from "@pankod/refine";
import { useTranslation } from "react-i18next";

import NormalizeData from "helpers/normalizeData";

import { SchoolYearContext } from "context/SchoolYearContext";

import { ISchoolYear } from "interfaces";
import GetSchoolYearTitle from "helpers/getSchoolYearTitle";
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

  const { schoolYearContext, changeSchoolYearContext } = useContext(SchoolYearContext);

  //const [currSchoolYear, setCurrSchoolYear] = useState(["1","Select a school year"]);

  const currentLocale = locale();

  const schoolYearListQueryResult = useList<ISchoolYearListQueryResult>({ resource: "school-years" });  
  const schoolYearList = NormalizeData(schoolYearListQueryResult).data;
  console.log('schoolYearSelect: ', schoolYearList);
  
  const schoolYearMenu = (
    <Menu selectedKeys={[schoolYearContext.id]}>
      {[...(schoolYearList || [])].sort().map((schoolYear: ISchoolYear) => (
        <Menu.Item
          key={schoolYear.id}
          onClick={() => {
            GetSchoolYearTitle(schoolYear.id)
            .then(res => changeSchoolYearContext({id: schoolYear.id, title: res}));
            console.log('elected school year: ', schoolYear);
          }}
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

/*   useEffect(() => {
    // storing input name
    localStorage.setItem("selectedSchoolYearId", JSON.stringify(currSchoolYear[0]));
  }, [currSchoolYear]); */

  //const currSchoolYearTitle = GetSchoolYearTitle(currSchoolYear);
  //GetSchoolYearTitle(currSchoolYear).then(res => console.log('title in header: ', res))
  //console.log(currSchoolYearTitle);

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
            {schoolYearContext.title}
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
