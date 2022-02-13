import { useOne, IResourceComponentsProps } from "@pankod/refine-core";

import {
  Show,
  Card,
  Typography,
  Select,
  useSelect,
} from "@pankod/refine-antd";

import NormalizeData from "helpers/normalizeData";

import { RenderCourses } from "components/customRenders";

import { ISchoolYear } from "interfaces";
import { useState } from "react";

const { Title, Text } = Typography;

export const AvailableBooks: React.FC<IResourceComponentsProps> = () => {

  const [currSchoolYear, setCurrSchoolYear] = useState("1");

  const schoolYearQueryResult = useOne<ISchoolYear>({
    resource: "school-years",
    id: currSchoolYear,
    metaData: {
      populate: [
        "courses",
        "courses.libraries",
        "courses.libraries.books"
      ],
    },
  });
  const { data, isLoading } = schoolYearQueryResult;
  const record = data?.data;

  console.log('avail books: record: ', record);

  const normalizedRecord = NormalizeData(record);

  const { selectProps: schoolYearSelect } = useSelect<ISchoolYear>({
    resource: "school-years",
  });

  function onChange(value: any) {
    console.log(`selected ${value}`);
    setCurrSchoolYear(value);
    console.log(currSchoolYear);
  }

  return (
    <>
      <Card>
        <Select
          style={{ minWidth: 200 }}
          placeholder="Select School year"
          {...schoolYearSelect}
          onChange={onChange}
        />
      </Card>
      <Show isLoading={isLoading}>
        <Title level={5}>Id</Title>
        <Text>{record?.id}</Text>
        <Title level={5}>Title</Title>
        <Text>{record?.title}</Text>
      </Show>
      {RenderCourses(normalizedRecord?.courses)}
    </>
  );
};