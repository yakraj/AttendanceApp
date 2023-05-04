import React, {createContext, useState} from 'react';

// Create the context object
export const MainContext = createContext(null);
//
// Create the provider component
export const MainProvider = ({children}) => {
  const [ActiveUser, setActiveUser] = useState<string>('yakraj1234');

  // this is for add new user
  const [Name, setName] = useState<string>('');
  const [Salph, setSalph] = useState<number>(0);
  const [Pf, setPf] = useState<number>(0);
  const [Esic, setEsic] = useState<number>(0);
  const [ExCharge, setExCharge] = useState<number>(0);

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
    {
      name: 'Dolma pariyar',
      salph: 54,
      pf: 12,
      esic: 250,
      exCharge: 0,
      userId: 'dolma1234',
    },
  ]);

  const [tableData, onTableData] = useState([
    {
      day: '01',
      startTime: '-',
      overTime: '-',
      leaveTime: 0,
      totalHours: 0,
      remarks: 'Saturday',
      userId: 'yakraj1234',
    },
    {
      day: '02',
      startTime: '7:00 AM',
      overTime: '7:00 PM',
      leaveTime: 0,
      totalHours: 12,
      remarks: 'present',
      userId: 'yakraj1234',
    },
    {
      day: '03',
      startTime: '7:00 AM',
      overTime: '7:00 PM',
      leaveTime: 1,
      totalHours: 11,
      remarks: 'present',
      userId: 'yakraj1234',
    },
    {
      day: '03',
      startTime: '7:00 AM',
      overTime: '7:00 PM',
      leaveTime: 1,
      totalHours: 11,
      remarks: 'present',
      userId: 'dolma1234',
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

  // export data
  const contextValue = {
    ActiveUser,
    setActiveUser,
    userData,
    tableData, //  this is for new user
    Name,
    setName,
    Salph,
    setSalph,
    Pf,
    setPf,
    Esic,
    setEsic,
    ExCharge,
    setExCharge,
    CreateUser,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
