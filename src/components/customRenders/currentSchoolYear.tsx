// Probably to be deleted
import {
useList, //useTable
useTranslate
} from "@pankod/refine-core";

import { Button, Space, Dropdown, Icons, Menu } from "@pankod/refine-antd";

import { useState } from "react";
import { ISchoolYear } from "interfaces";
import NormalizeData from "helpers/normalizeData";

const { DownOutlined } = Icons;

type ISchoolYearListQueryResult = {
  options: ISchoolYear;
};

export const RenderCurrSchoolYear = () => {
  
  const [currSchoolYear, setCurrSchoolYear] = useState("1");
  
  const t = useTranslate();

  const schoolYearListQueryResult = useList<ISchoolYearListQueryResult>({ resource: "school-years" });

  const schoolYearList = NormalizeData(schoolYearListQueryResult).data;
  console.log('schoolYearSelect: ', schoolYearList);
  
  const schoolYearMenu = (
    <Menu selectedKeys={[currSchoolYear]}>
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

  return (
    <Dropdown overlay={schoolYearMenu}>
    <Button type="link">
      <Space>
        {currSchoolYear}
        <DownOutlined />
      </Space>
    </Button>
  </Dropdown>
  );
}