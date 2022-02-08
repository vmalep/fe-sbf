import React, { createContext, useState, FC } from "react";
import { ISchoolYearContext, ISchoolYear } from "interfaces";

const contextDefaultValues: ISchoolYearContext = {
  schoolYearContext: {id: "", title: ""},
  changeSchoolYearContext: () => {}
};

export const SchoolYearContext = createContext<ISchoolYearContext>(
  contextDefaultValues
);

const SchoolYearProvider: FC = ({ children }) => {
  const [schoolYearContext, setSchoolYearContext] = useState<ISchoolYear>(contextDefaultValues.schoolYearContext);

  const changeSchoolYearContext = (newSchooYearContext: ISchoolYear) => setSchoolYearContext(newSchooYearContext);

  return (
    <SchoolYearContext.Provider
      value={{
        schoolYearContext,
        changeSchoolYearContext
      }}>
      {children}
    </SchoolYearContext.Provider>
  );
};

export default SchoolYearProvider;