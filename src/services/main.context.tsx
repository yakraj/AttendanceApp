import React, {createContext, useEffect, useState} from 'react';

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
  // thi state for firsttime ever the app gets initilized
  const [initilized, oninitilized] = useState<boolean>(true);

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
          // while the month data is exist then it will find the yesterdays data is added or not
          // it will loop throught the users and search, same users data added or not
          const today = new Date();
          const yesterday = new Date(today); // Create a new date object with the same value as today
          yesterday.setDate(today.getDate() - 1); // Subtract 1 day from the date
          const yesterdayMonth = yesterday.toLocaleString('default', {
            month: 'long',
          }); // Get the month name
          const yesterdayDate = yesterday.getDate(); // Get the day of the month
          const MissingFiller = user => {
            const hasMissing =
              findTargetObject.months[currMonth].length < Number(currDay) - 1;

            if (hasMissing) {
              let tempMonth = findTargetObject.months[currMonth];
              const filledMonths = [];
              for (let i = 0; i < tempMonth.length; i++) {
                filledMonths.push(tempMonth[i]);
                if (i < tempMonth.length - 1) {
                  const currentNumber = tempMonth[i].number;
                  const nextNumber = tempMonth[i + 1].number;

                  const diff = nextNumber - currentNumber;

                  if (diff > 1) {
                    for (let j = 1; j < diff; j++) {
                      filledMonths.push({
                        day: currentNumber + j,
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
                }
              }
              findTargetObject.months[currMonth] = filledMonths;
            }

            const hasEntry = findTargetObject.months[
              yesterdayMonth.toLowerCase()
            ].some(
              entry => entry.userId === user && entry.day === yesterdayDate,
            );
            // if (hasEntry) {
            //   return true;
            // } else {
            //   findTargetObject.months[yesterdayMonth.toLowerCase()].push({
            //     day: yesterdayDate,
            //     startTime: '-',
            //     overTime: '-',
            //     leaveTime: 0,
            //     totalHours: 0,
            //     remarks: 'unfilled',
            //     userId: user,
            //     uniqId: yesterdayMonth + generateRandomString(5),
            //   });
            //   onTableData(tempTable);
            // }
          };
          // console.log(findTargetObject.months[yesterdayMonth]);

          for (let i = 0; i < userData.length; i++) {
            MissingFiller(userData[i].userId);
          }
        } else {
          // while the month is not exist it will add month array
          findTargetObject.months[currMonth.toLowerCase()] = currMonth;
          onTableData(tempTable);
        }
      }
    } else {
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
