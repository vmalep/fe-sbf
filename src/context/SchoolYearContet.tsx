import React, { createContext, useState, FC } from "react";
import { ISchoolYearContext } from "interfaces";

const contextDefaultValues: ISchoolYearContext = {
  schoolYearId: "",
  changeSchoolYearId: () => {}
};

export const SchoolYearContext = createContext<ISchoolYearContext>(
  contextDefaultValues
);

const SchoolYearProvider: FC = ({ children }) => {
  const [schoolYearId, setSchoolYear] = useState<string>(contextDefaultValues.schoolYearId);

  const changeSchoolYearId = (newSchooYearId: string) => setSchoolYear(newSchooYearId);

  return (
    <SchoolYearContext.Provider value={{schoolYearId, changeSchoolYearId}}>
      {children}
    </SchoolYearContext.Provider>
  );
};

export default SchoolYearProvider;