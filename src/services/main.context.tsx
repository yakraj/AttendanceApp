import React, {createContext, useEffect, useState} from 'react';

// Create the context object
export const MainContext = createContext(null);
//
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
  // thi state for firsttime ever the app gets initilized
  const [initilized, oninitilized] = useState<boolean>(false);
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date
    .toLocaleString('default', {month: 'short'})
    .toLowerCase();
  const currDay = date.getDate();

  // Set the context value using an object
  const [userData, onUserData] = useState([]);

  const ChangeUser = (userId: string) => {
    setActiveUser(userId);
  };
  const [tableData, onTableData] = useState([
    // [
    //   {
    //     name: 'yakraj pariyar',
    //     salph: 74,
    //     pf: 12,
    //     esic: 250,
    //     exCharge: 200,
    //     userId: 'yakraj1234',
    //   },
    //   {
    //     name: 'tulsi pariyar',
    //     salph: 54,
    //     pf: 0,
    //     esic: 250,
    //     exCharge: 0,
    //     userId: 'tulsi1234',
    //   },
    //   {
    //     name: 'Dolma pariyar',
    //     salph: 54,
    //     pf: 12,
    //     esic: 250,
    //     exCharge: 0,
    //     userId: 'dolma1234',
    //   },
    // ]
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
            day: '01',
            startTime: '-',
            overTime: '-',
            leaveTime: 0,
            totalHours: 0,
            remarks: 'Saturday',
            userId: 'yakraj1234',
            uniqId: 'may01ewfwe55',
          },
          {
            day: '02',
            startTime: '7:00 AM',
            overTime: '7:00 PM',
            leaveTime: 0,
            totalHours: 12,
            remarks: 'present',
            userId: 'yakraj1234',
            uniqId: 'may01ehhg',
          },
          {
            day: '02',
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

  function generateRandomString(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  const CreateUser = (
    name: string,
    salph: string,
    pf: string,
    esic: string,
    exCharge: string,
  ) => {
    let userName = name + generateRandomString(4);
    let TempUser = {
      name: '',
      salph: 0,
      pf: 0,
      esic: 0,
      exCharge: 0,
      userId: '',
    };
    TempUser.name = name;
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
  };

  // data checker and retriever
  useEffect(() => {
    const YearChecker = tableData.find(x => (x.year = currYear));
    if (initilized) {
      if (!YearChecker) {
        onTableData([
          ...tableData,
          {
            year: currYear,
            months: {
              [currMonth]: [],
            },
          },
        ]);
      } else {
        let tempTable = tableData;
        const MonthChecker = YearChecker.months.hasOwnProperty(currMonth);
        let findTargetObject = tempTable.find(obj => obj.year === currYear);
        if (MonthChecker) {
          console.log('Month is added there');
          // while the month data is exist then it will find the yesterdays data is added or not
          // it will loop throught the users and search, same users data added or not
          const today = new Date();
          const yesterday = new Date(today); // Create a new date object with the same value as today
          yesterday.setDate(today.getDate() - 1); // Subtract 1 day from the date
          const yesterdayMonth = yesterday.toLocaleString('default', {
            month: 'long',
          }); // Get the month name
          const yesterdayDate = yesterday.getDate(); // Get the day of the month
          const YesterDayDataChecker = user => {
            const hasEntry = findTargetObject.months[
              yesterdayMonth.toLowerCase()
            ].some(
              entry => entry.userId === user && entry.day === yesterdayDate,
            );
            if (hasEntry) {
              console.log('has entry is true');
              return true;
            } else {
              findTargetObject.months[yesterdayMonth.toLowerCase()].push({
                day: yesterdayDate,
                startTime: '-',
                overTime: '-',
                leaveTime: 0,
                totalHours: 0,
                remarks: 'unfilled',
                userId: user,
                uniqId: yesterdayMonth + generateRandomString(5),
              });
              onTableData(tempTable);
            }
          };
          // console.log(yesterdayMonth);
          // console.log(findTargetObject.months[yesterdayMonth]);

          for (let i = 0; i < userData.length; i++) {
            YesterDayDataChecker(userData[i].userId);
          }
        } else {
          // while the month is not exist it will add month array
          findTargetObject.months[currMonth.toLowerCase()] = currMonth;
          onTableData(tempTable);
        }
      }
    } else {
      console.log('initilized is false');
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
    }
  }, []);
  console.log(tableData);
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
  };

  useEffect(() => {
    let ThisYear = tableData.find(x => x.year === new Date().getFullYear());
    if (ThisYear) {
      setCurMOD(ThisYear.months[currMonth]);
    }
  }, [ActiveUser]);
  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
