import React, {createContext, useState} from 'react';

// Create the context object
export const MainContext = createContext(null);
//
// Create the provider component
export const MainProvider = ({children}) => {
  // Set the context value using an object
  const [userData, onUserData] = useState([
    {
      name: 'yakraj pariyar',
      salph: 74,
      pf: 12,
      esic: 250,
      exCharge: 200,
      userId: 'yakraj1234',
    },
    {
      name: 'tulsi pariyar',
      salph: 54,
      pf: 0,
      esic: 250,
      exCharge: 0,
      userId: 'tulsi1234',
    },
  ]);

  const [tableData, onTableData] = useState([
    {
      day: 'Monday',
      startTime: '9:00 AM',
      overTime: '6:00 PM',
      leaveTime: '6:30 PM',
      totalHours: '9.5',
      remarks: 'Worked on project X',
      userId: 'yakraj1234',
    },
    {
      day: 'Monday',
      startTime: '9:00 AM',
      overTime: '6:00 PM',
      leaveTime: '6:30 PM',
      totalHours: '9.5',
      remarks: 'Worked on project X',
      userId: 'tulsi1234',
    },
  ]);

  //  for create new user
  type createUsertype = {
    name: string;
    salph: number;
    pf: number;
    esic: number;
    exCharge: number;
  };

  const CreateUser = ({name, salph, pf, esic, exCharge}: createUsertype) => {
    let TempUser = {
      name: '',
      salph: 0,
      pf: 0,
      esic: 0,
      exCharge: 0,
      userId: '',
    };
    TempUser.name = name;
    TempUser.salph = salph;
    TempUser.pf = pf;
    TempUser.esic = esic;
    TempUser.exCharge = exCharge;
    TempUser.userId = name + '1234';
    onUserData([...userData, TempUser]);
  };
  const contextValue = {
    // myValue,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
