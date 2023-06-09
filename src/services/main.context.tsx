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

  //
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
  const [RetrieveUser, onRetrieveUser] = useState<boolean>(false);

  // Set the context value using an object
  const [userData, onUserData] = useState([]);

  const ChangeUser = (userId: string) => {
    setActiveUser(userId);
  };
  const [tableData, onTableData] = useState([]);
  const [Retrieved, onRetrieved] = useState<boolean>(false);
  const [initiRetrieved, oninitiRetrieved] = useState<boolean>(false);

  //  for create new user

  const CreateUser = (
    name: string,
    Company: string,
    salph: string,
    pf: string,
    pfsel: string,
    esic: boolean,
    exCharge: string,
  ) => {
    let userName = name + generateRandomString(4);
    let TempUser = {
      name: '',
      company: '',
      salph: 0,
      pf: 0,
      esic: false,
      exCharge: 0,
      userId: '',
    };
    TempUser.name = name;
    TempUser.company = Company;
    TempUser.salph = Number(salph);
    TempUser.pf = pfsel === 'yes' ? Number(pf) : 0;
    TempUser.esic = esic;
    TempUser.exCharge = Number(exCharge);
    TempUser.userId = userName;
    onUserData([...userData, TempUser]);

    // it is for temp attendance
    let Data = [];
    let year = new Date().getFullYear();
    let tempTable = tableData;

    for (let i = 0; i < new Date().getDate() - 1; i++) {
      let dayData = {
        day: String(i + 1),
        startTime: '-',
        overTime: '-',
        leaveTime: 0,
        totalHours: 0,
        remarks: '-',
        userId: userName,
        dtype: 'regular',
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
    esic: boolean,
    exCharge: string,
    user: string,
  ) => {
    let TempUsers = [...userData];
    let TempUser = TempUsers.find(x => x.userId === user);
    TempUser.name = TempUser.name !== name ? name : TempUser.name;
    TempUser.company =
      TempUser.company !== Company ? Company : TempUser.company;
    TempUser.salph =
      TempUser.salph !== Number(salph) ? Number(salph) : TempUser.salph;
    TempUser.pf = TempUser.pf !== Number(pf) ? Number(pf) : TempUser.pf;
    TempUser.esic = TempUser.esic !== esic ? esic : TempUser.esic;
    TempUser.exCharge =
      TempUser?.exCharge !== Number(exCharge)
        ? Number(exCharge)
        : TempUser.exCharge;

    onUserData(TempUsers);
  };

  // data checker and retriever

  // this is salary calculator
  const SalaryCalculator = (user: string, year: number, month: string) => {
    let ThisYear = tableData.find(x => x.year === year);
    let findMonth = ThisYear.months[month];
    let finduer = userData.filter(id => id.userId === user);
    let findUsersData = findMonth.filter(id => id.userId === user);

    let withoutsalary =
      findUsersData.reduce((acc, curr) => {
        return acc + curr.totalHours;
      }, 0) * finduer[0].salph;

    let epf =
      (findUsersData.filter(day => day.totalHours >= 8 && day.dtype !== 'ot')
        .length *
        8 *
        finduer[0].salph *
        finduer[0].pf) /
      100;
    // return salary;
    // it will return the esic
    let esicc =
      findUsersData.filter(day => day.totalHours >= 8 && day.dtype !== 'ot')
        .length *
      8 *
      finduer[0].salph *
      0.0075;

    let salary =
      findUsersData.reduce((acc, curr) => {
        return acc + curr.totalHours;
      }, 0) *
        finduer[0].salph -
      epf -
      esicc -
      finduer[0].exCharge;
    return {
      withoutsalary: withoutsalary.toFixed(2),
      salary: salary.toFixed(2),
      pf: epf.toFixed(2),
      esic: finduer[0].esic ? esicc.toFixed(2) : 0,
    };
  };

  // this is pf calculator

  const PfCalculator = () => {};

  // this is esic calculator

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
    initiRetrieved,
    initilized,
    oninitilized,
    SalaryCalculator,
  };
  // +++++++++++++++-------------------+++++++++++++++----------------------+++++++++++++++++++++-------------------
  // from here i'll be using the async storage to store all data

  // store the initialization

  const storeInilitization = async value => {
    try {
      await AsyncStorage.setItem('@initilize_Key', JSON.stringify(value));
    } catch (error) {
      // console.log('Error storing boolean value:', error);
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
    if (!Retrieved) {
      return;
    }
    storeStartTime(startTime);
  }, [startTime]);
  useEffect(() => {
    if (!Retrieved) {
      return;
    }
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
    // console.log('tabledata Changed', tableData);
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

      if (jsonValue != null) {
        onTableData(JSON.parse(jsonValue));
        // console.log('I executed fist');
        return jsonValue;
      } else {
        onTableData([]);
      }
    } catch (e) {
      // error reading value
    }
  };
  // reading userDatar
  const ReadUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_data_key');
      onRetrieveUser(true);
      if (jsonValue != null) {
        onUserData(JSON.parse(jsonValue));
        return JSON.parse(jsonValue);
      } else {
        null;
      }
    } catch (e) {
      // error reading value
    }
  };
  // this is validator

  // const Validator = (data: any, userData: any) => {
  //   console.log('step: 1, entered inside useEffect');

  // };
  useEffect(() => {
    const checkTabledata = () => {
      Promise.all([ReadTableData(), ReadUserData()])
        .then(([Tabledata, userData]) => {
          // console.log('until here this is good');
          let tempTable = Tabledata ? JSON.parse(Tabledata) : [];
          let YearChecker = tempTable.find(x => x.year == currYear);

          // console.log('step: 2, Not initialized');
          if (!YearChecker) {
            // console.log('step: 3, Year doesnot exist');
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
            // console.log('step: 4, Year is there existing');
            const MonthChecker = YearChecker.months.hasOwnProperty(currMonth);

            let findTargetObject = tempTable.find(obj => obj.year === currYear);
            if (MonthChecker) {
              // console.log('step: 4, Month is existing');
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
                  // console.log('step: 5, There is some missing data');
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
                      return num.day == i;
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
                        dtype: 'regular',
                        uniqId: yesterdayMonth + generateRandomString(5),
                      });
                    }
                  }

                  // findTargetObject.months[currMonth] = filledMonths;
                  TempMonthData = [...TempMonthData, ...filledMonths];

                  onTableData(tempTable);
                  return;
                }
              };
              for (let i = 0; i < userData.length; i++) {
                MissingFiller(userData[i].userId);
                // console.log('UserData');
              }
              findTargetObject.months[currMonth] = TempMonthData.length
                ? TempMonthData
                : findTargetObject.months[currMonth];

              return;
            } else {
              // console.log('step: 6, Month doesnot exist');
              // while the month is not exist it will add month array
              findTargetObject.months[currMonth.toLowerCase()] = [];

              onTableData(tempTable);

              return;
            }
            return;
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
    checkTabledata();
  }, []);

  // useEffect(() => {
  //   console.log('changed');
  // }, [tableData]);

  useEffect(() => {
    ReadActiveUser();
    ReadUserData();
    ReadStartTime();
    ReadOverTime();
    ReadRemarks();
  }, []);

  // this is special which also validates the data inside table

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
