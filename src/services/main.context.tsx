import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Create the context object
export const MainContext = createContext(null);
//
// random character creator
export function generateRandomString(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
// date and time declearation
export const date = new Date();
export const currYear = date.getFullYear();
export const currMonth = date
  .toLocaleString('default', {month: 'short'})
  .toLowerCase();
export const currDay = date.getDate();
// Create the provider component
export const MainProvider = ({children}) => {
  const [ActiveUser, setActiveUser] = useState<string>();
  const [CurMOD, setCurMOD] = useState<string>([]);

  // this is for add new user
  const [Name, setName] = useState<string>('');
  const [Salph, setSalph] = useState<number>(0);
  const [Pf, setPf] = useState<number>(0);
  const [Esic, setEsic] = useState<number>(0);
  const [ExCharge, setExCharge] = useState<number>(0);

  // these data are for create information
  const [startTime, onstartTime] = useState('');
  const [overTime, onoverTime] = useState('');
  const [Remarks, onRemarks] = useState('');
  // thi state for firsttime ever the app gets initilized
  const [initilized, oninitilized] = useState<boolean>(false);
  const [Retrieved, onRetrieved] = useState<boolean>(false);
  const [RetrieveUser, onRetrieveUser] = useState<boolean>(false);

  // Set the context value using an object
  const [userData, onUserData] = useState([
    {
      company: 'dynamic mega tech engineering.',
      name: 'yakraj pariyar',
      salph: 74,
      pf: 12,
      esic: 250,
      exCharge: 200,
      userId: 'yakraj1234',
    },
    {
      company: 'autofit industrial limited.',
      name: 'tulsi pariyar',
      salph: 54,
      pf: 0,
      esic: 250,
      exCharge: 0,
      userId: 'tulsi1234',
    },
    {
      company: 'crown closures',
      name: 'Dolma pariyar',
      salph: 54,
      pf: 12,
      esic: 250,
      exCharge: 0,
      userId: 'dolma1234',
    },
  ]);

  const ChangeUser = (userId: string) => {
    setActiveUser(userId);
  };
  const [tableData, onTableData] = useState([
    {
      year: 2023,
      months: {
        jan: [
          {
            day: '01',
            startTime: '-',
            overTime: '-',
            leaveTime: 0,
            totalHours: 0,
            remarks: 'Saturday',
            userId: 'yakraj1234',
            uniqId: 'may01ewf',
          },
          {
            day: '02',
            startTime: '7:00 AM',
            overTime: '7:00 PM',
            leaveTime: 0,
            totalHours: 12,
            remarks: 'present',
            userId: 'yakraj1234',
            uniqId: 'may01easd',
          },
          {
            day: '03',
            startTime: '7:00 AM',
            overTime: '7:00 PM',
            leaveTime: 1,
            totalHours: 11,
            remarks: 'present',
            userId: 'yakraj1234',
            uniqId: 'mayewwf',
          },
          {
            day: '03',
            startTime: '7:00 AM',
            overTime: '7:00 PM',
            leaveTime: 1,
            totalHours: 11,
            remarks: 'present',
            uniqId: 'hghg045sdf',
          },
        ],
        may: [
          {
            day: 1,
            startTime: '-',
            overTime: '-',
            leaveTime: 0,
            totalHours: 0,
            remarks: 'Saturday',
            userId: 'yakraj1234',
            uniqId: 'may01ewfwe55',
          },
          {
            day: 18,
            startTime: '7:00 AM',
            overTime: '7:00 PM',
            leaveTime: 0,
            totalHours: 12,
            remarks: 'present',
            userId: 'yakraj1234',
            uniqId: 'may01ehhg',
          },
          {
            day: 2,
            startTime: '7:00 AM',
            overTime: '7:00 PM',
            leaveTime: 0,
            totalHours: 12,
            remarks: 'present',
            userId: 'dolma1234',
            uniqId: 'may01w556',
          },
        ],
      },
    },
  ]);

  //  for create new user

  const CreateUser = (
    name: string,
    Company: string,
    salph: string,
    pf: string,
    esic: string,
    exCharge: string,
  ) => {
    let userName = name + generateRandomString(4);
    let TempUser = {
      name: '',
      company: '',
      salph: 0,
      pf: 0,
      esic: 0,
      exCharge: 0,
      userId: '',
    };
    TempUser.name = name;
    TempUser.company = Company;
    TempUser.salph = Number(salph);
    TempUser.pf = Number(pf);
    TempUser.esic = Number(esic);
    TempUser.exCharge = Number(exCharge);
    TempUser.userId = userName;
    onUserData([...userData, TempUser]);

    // it is for temp attendance
    let Data = [];
    let year = new Date().getFullYear();
    let tempTable = tableData;

    for (let i = 0; i < new Date().getDate(); i++) {
      let dayData = {
        day: String(i + 1),
        startTime: '-',
        overTime: '-',
        leaveTime: 0,
        totalHours: 0,
        remarks: 'Unfilled',
        userId: userName,
        uniqId: currMonth + String(i + 1) + generateRandomString(5),
      };
      Data.push(dayData);
    }
    for (let i = 0; i < tempTable.length; i++) {
      if (tempTable[i].year === year) {
        tempTable[i].months[currMonth.toLowerCase()].push(...Data);
        break;
      }
    }
    onTableData(tempTable);
    setActiveUser(userName);
  };
  const UpdateUser = (
    name: string,
    Company: string,
    salph: string,
    pf: string,
    esic: string,
    exCharge: string,
    user: string,
  ) => {
    let TempUsers = userData;
    let TempUser = TempUsers.find(x => x.userId === user);
    TempUser.name = TempUser.name !== name ? name : TempUser.name;
    TempUser.company =
      TempUser.company !== Company ? Company : TempUser.company;
    TempUser.salph =
      TempUser.salph !== Number(salph) ? Number(salph) : TempUser.salph;
    TempUser.pf = TempUser.pf !== Number(pf) ? Number(pf) : TempUser.pf;
    TempUser.esic =
      TempUser.esic !== Number(esic) ? Number(esic) : TempUser.esic;
    TempUser.exCharge =
      TempUser?.exCharge !== Number(exCharge)
        ? Number(exCharge)
        : TempUser.exCharge;

    onUserData(TempUsers);
  };

  // data checker and retriever
  useEffect(() => {
    if (!Retrieved) {
      return;
    }

    console.log('step: 1, entered inside useEffect');
    const YearChecker = tableData.find(x => (x.year = currYear));
    if (!initilized) {
      console.log('step: 2, Not initialized');
      if (!YearChecker) {
        console.log('step: 3, Year doesnot exist');
        onTableData([
          ...tableData,
          {
            year: currYear,
            months: {
              [currMonth]: [],
            },
          },
        ]);
        return;
      } else {
        console.log('step: 4, Year is there existing');
        let tempTable = [...tableData];
        const MonthChecker = YearChecker.months.hasOwnProperty(currMonth);
        let findTargetObject = tempTable.find(obj => obj.year === currYear);
        if (MonthChecker) {
          console.log('step: 4, Month is existing');
          // while the month data is exist then it will find the yesterdays data is added or not
          // it will loop throught the users and search, same users data added or not
          const today = new Date();
          const yesterday = new Date(today); // Create a new date object with the same value as today

          yesterday.setDate(today.getDate() - 1); // Subtract 1 day from the date
          const yesterdayMonth = yesterday.toLocaleString('default', {
            month: 'long',
          }); // Get the month name
          const yesterdayDate = yesterday.getDate(); // Get the day of the month
          let ThisMonth = findTargetObject.months[currMonth];
          let TempMonthData = [];
          TempMonthData.length = 0;
          const MissingFiller = user => {
            let UserData = ThisMonth.filter(x => x.userId === user);

            const hasMissing = UserData.length < Number(currDay) - 1;

            if (hasMissing) {
              console.log('step: 5, There is some missing data');
              let tempMonth = UserData;
              const filledMonths = [];

              var largestNumber = tempMonth.some(function (num) {
                return num.day === new Date().getDate();
              })
                ? new Date().getDate()
                : new Date().getDate() - 1;

              filledMonths.length = 0;

              for (var i = 1; i <= largestNumber; i++) {
                let existfinder = tempMonth.find(function (num) {
                  return num.day === i;
                });

                if (existfinder) {
                  filledMonths.push(existfinder);
                } else {
                  filledMonths.push({
                    day: i,
                    startTime: '-',
                    overTime: '-',
                    leaveTime: 0,
                    totalHours: 0,
                    remarks: '-',
                    userId: user,
                    uniqId: yesterdayMonth + generateRandomString(5),
                  });
                }
              }

              // findTargetObject.months[currMonth] = filledMonths;
              TempMonthData = [...TempMonthData, ...filledMonths];
              return;
            }
          };
          for (let i = 0; i < userData.length; i++) {
            MissingFiller(userData[i].userId);
          }
          findTargetObject.months[currMonth] = TempMonthData.length
            ? TempMonthData
            : findTargetObject.months[currMonth];
          return;
        } else {
          console.log('step: 6, Month doesnot exist');
          // while the month is not exist it will add month array
          findTargetObject.months[currMonth.toLowerCase()] = currMonth;
          onTableData(tempTable);
          return;
        }
        return;
      }
    } else {
      console.log('step: 3, Add iniliazation data');
      onTableData([
        ...tableData,
        {
          year: currYear,
          months: {
            [currMonth]: [],
          },
        },
      ]);
      oninitilized(true);
      return;
    }
  }, [Retrieved, tableData]);

  // Create today data

  // export data
  const contextValue = {
    ActiveUser,
    setActiveUser,
    userData,
    tableData, //  this is for new user
    onTableData,
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
    ChangeUser,
    CurMOD,
    setCurMOD,
    onUserData,
    UpdateUser,
    startTime,
    onstartTime,
    overTime,
    onoverTime,
    Remarks,
    onRemarks,
  };
  // +++++++++++++++-------------------+++++++++++++++----------------------+++++++++++++++++++++-------------------
  // from here i'll be using the async storage to store all data

  // store the initialization

  const storeInilitization = async value => {
    try {
      await AsyncStorage.setItem('@initilize_Key', JSON.stringify(value));
    } catch (error) {
      console.log('Error storing boolean value:', error);
    }
  };

  // store active username
  const storeActiveUser = async value => {
    try {
      await AsyncStorage.setItem('@active_user_Key', value);
    } catch (e) {
      // saving error
    }
  };

  // store start time
  const storeStartTime = async value => {
    try {
      await AsyncStorage.setItem('@start_time_Key', value);
    } catch (e) {
      // saving error
    }
  };
  // store over time
  const storeOverTime = async value => {
    try {
      await AsyncStorage.setItem('@over_time_key', value);
    } catch (e) {
      // saving error
    }
  };
  // store remarks
  const storeRemarks = async value => {
    try {
      await AsyncStorage.setItem('@Remarks_key', value);
    } catch (e) {
      // saving error
    }
  };
  // storing Tabledata
  const storeTableData = async value => {
    console.log('it is executing');
    try {
      await AsyncStorage.setItem('@table_data_Key', JSON.stringify(value));
      // const jsonValue = JSON.stringify(value);
      // await AsyncStorage.setItem('@table_data_Key', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  // storing userData
  const storeUserData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@user_data_key', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    storeActiveUser(ActiveUser);
  }, [ActiveUser]);
  useEffect(() => {
    storeStartTime(startTime);
  }, [startTime]);
  useEffect(() => {
    storeOverTime(overTime);
  }, [overTime]);
  useEffect(() => {
    storeRemarks(Remarks);
  }, [Remarks]);
  useEffect(() => {
    storeInilitization(initilized);
  }, [initilized]);

  useEffect(() => {
    if (!Retrieved) {
      return;
    }
    console.log('tabledata Changed');
    const saveData = async () => {
      try {
        await storeTableData(tableData);
      } catch (e) {
        // handle saving error
      }
    };

    saveData();
  }, [tableData]);
  useEffect(() => {
    if (!RetrieveUser) {
      return;
    }
    const saveData = async () => {
      try {
        await storeUserData(userData);
      } catch (e) {
        // handle saving error
      }
    };

    saveData();
  }, [userData]);

  //+++++++++++++++++++----------------+++++++++++++++++++++-----------------------++++++++++++++--------------
  // Reading the active username
  const ReadActiveUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@active_user_Key');
      if (value !== null) {
        setActiveUser(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const ReadInilization = async () => {
    try {
      const value = await AsyncStorage.getItem('@initilize_Key');
      if (value !== null) {
        return oninitilized(JSON.parse(value));
      }
    } catch (error) {
      console.log('Error retrieving boolean value:', error);
    }
  };
  const ReadStartTime = async () => {
    try {
      const value = await AsyncStorage.getItem('@start_time_Key');
      if (value !== null) {
        onstartTime(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const ReadOverTime = async () => {
    try {
      const value = await AsyncStorage.getItem('@over_time_key');
      if (value !== null) {
        onoverTime(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const ReadRemarks = async () => {
    try {
      const value = await AsyncStorage.getItem('@Remarks_key');
      if (value !== null) {
        onRemarks(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  // Reading tabledata

  const ReadTableData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@table_data_Key');
      onRetrieved(true);
      return jsonValue != null ? onTableData(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };
  // reading userDatar
  const ReadUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_data_key');
      onRetrieveUser(true);
      return jsonValue != null ? onUserData(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    ReadActiveUser();
    ReadTableData();
    ReadUserData();
    ReadStartTime();
    ReadOverTime();
    ReadRemarks();
    ReadInilization();
  }, []);

  useEffect(() => {
    let ThisYear = tableData.find(x => x.year === new Date().getFullYear());
    if (ThisYear) {
      setCurMOD(ThisYear.months[currMonth]);
    }
  }, [ActiveUser, tableData]);
  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
