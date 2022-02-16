import {
  useOne,
  IResourceComponentsProps,
  useGetIdentity,
  useNavigation,
} from "@pankod/refine-core";

import {
  Card,
  Typography,
  Select,
  useSelect,
  Row, Col, Space,
} from "@pankod/refine-antd";

import NormalizeData from "helpers/normalizeData";

import { RenderCourses } from "components/customRenders";

import { ISchoolYear, IUser } from "interfaces";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

export const AvailableBooks: React.FC<IResourceComponentsProps> = () => {

  const currUser = useGetIdentity<IUser>().data;
  const [currSchoolYear, setCurrSchoolYear] = useState("1");
  const [normalizedCourses, setNormalizedCourses] = useState();
  const { show } = useNavigation();
  
  const schoolYearQueryResult = useOne<ISchoolYear>({
    resource: "school-years",
    id: currSchoolYear,
    metaData: {
      populate: [
        "courses",
        "courses.libraries",
        "courses.libraries.books",
        "courses.libraries.books.users_permissions_user",
      ],
    },
  });
  
  //const { data } = schoolYearQueryResult;
  const record = schoolYearQueryResult?.data?.data;

  useEffect(() => {
    setNormalizedCourses(NormalizeData(record)?.courses);
  }, [record])

  const { selectProps: schoolYearSelect } = useSelect<ISchoolYear>({
    resource: "school-years",
  });

  function onChange(value: any) {
    setCurrSchoolYear(value);
  }

  return (
    <>
      <Card>
        <Row>
          <Col flex={1}>
            <Space align="baseline" ><Title level={5}>School year:</Title><Text strong >{record?.title}</Text></Space>
          </Col>
          <Col flex={1}>
            <Space align="baseline" ><Text>Select school year</Text>
              <Select
                style={{ minWidth: 200 }}
                placeholder={record?.title}
                {...schoolYearSelect}
                onChange={onChange}
              />
            </Space>
          </Col>
        </Row>
      </Card>
      {RenderCourses({normalizedCourses, currUser, show})}
    </>
  );
};