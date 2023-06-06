import LinearGradient from 'react-native-linear-gradient';
import CusT from '../components/custom.text';
import moment from 'moment';
import {CustView, NMorph} from '../components/devider';
import {TextInput, Alert} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  MainContext,
  currDay,
  currMonth,
  generateRandomString,
} from '../services/main.context';
import {windowHeight, windowWidth} from './utilitis';
type dutydatatype = {
  id: string;
};
export const DutyTime = ({id}: dutydatatype) => {
  const {
    tableData,
    onTableData,
    userData,
    startTime,
    onstartTime,
    overTime,
    onoverTime,
    Remarks,
    onRemarks,
  } = useContext(MainContext);

  const navigation = useNavigation();
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [passHours, onpassHours] = useState('');
  const [activeStart, onactiveStart] = useState(true);

  //   this is data of user
  const [currentUser, onCurrentUser] = useState<any>();
  const [todayExist, ontodayExist] = useState<any>();

  // setting up user
  useEffect(() => {
    const user = userData.find(x => x.userId === id);
    onCurrentUser(user);
  }, [userData]);

  const [PrevData, onPrevData] = useState();
  const [DefaultTime, onDefaultTime] = useState(new Date());

  // this will update my work
  const [updaTer, onupdaTer] = useState();

  const showTimePicker = (time: string) => {
    const currentDate = new Date();
    const Desired =
      time === 'start' ? '7:00 AM' : time === 'over' ? '7:00 PM' : time;

    // Extract hour, minute, and AM/PM from the desiredTime string
    const [hour, minute, ampm] = Desired.split(/:| /);
    // Convert hour from 12-hour format to 24-hour format
    let hours = parseInt(hour, 10);
    if (ampm === 'PM' && hours !== 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }

    // Set the desired time to the currentDate object
    currentDate.setHours(hours);
    currentDate.setMinutes(parseInt(minute, 10));
    currentDate.setSeconds(0);

    onDefaultTime(currentDate);
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };
  useEffect(() => {
    if (id) {
      let result = null;

      for (const obj of tableData) {
        for (const month in obj.months) {
          const data = obj.months[month];
          result = data.find(item => item.uniqId === id);
          if (result) {
            break;
          }
        }
        if (result) {
          break;
        }
      }
      onPrevData(result);
    }
  }, []);

  const handleTimeConfirm = selectedTime => {
    // Do something with the selected time
    const indianTime = selectedTime.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    });
    // Do something with the Indian time
    if (activeStart) {
      onstartTime(indianTime);
    } else {
      onoverTime(indianTime);
    }
    // Hide the time picker
    hideTimePicker();
  };

  const TimeDifference = () => {
    const format = 'h:mm a'; // Specify the time format

    // Parse time strings into moment objects
    let NewStartTime = startTime.slice(0, -2) + 'am';
    let NewOverTime = overTime.slice(0, -2) + 'pm';

    const time1 = moment(NewStartTime, format);
    const time2 = moment(NewOverTime, format);

    // Calculate the difference in minutes
    const timeDiffMinutes = time2.diff(time1, 'minutes');

    // Extract hours and minutes
    const hours = Math.floor(timeDiffMinutes / 60);
    const minutes = timeDiffMinutes % 60;

    // actual last calculation
    let DutyHours = hours + minutes / 60 - Number(passHours);
    return DutyHours;
    // console.log(`Time Difference: ${hours} hours ${minutes} minutes`);
  };

  // Absent user
  const AbsentUser = () => {
    let tempTable = [...tableData];
    let tempObject = {
      day: currDay,
      startTime: '-',
      overTime: '-',
      leaveTime: 0,
      totalHours: 0,
      remarks: Remarks ? Remarks : 'Absent',
      userId: currentUser.userId,
      uniqId: currMonth + generateRandomString(5),
    };
    // updating object
    let ThisYear = tempTable.find(x => x.year === DefaultTime.getFullYear());
    ThisYear.months[currMonth].push(tempObject);
    onupdaTer(new Date());
    onTableData(tempTable);
  };
  // update data of user
  const UpdateData = () => {
    let tempObject = {
      day: currDay,
      startTime: startTime,
      overTime: overTime,
      leaveTime: Number(passHours),
      totalHours: TimeDifference(),
      remarks: Remarks ? Remarks : 'Present',
      userId: currentUser.userId,
      uniqId: currMonth + generateRandomString(5),
    };
    let tempTable = [...tableData];
    let ThisYear = tempTable.find(x => x.year === DefaultTime.getFullYear());
    ThisYear.months[currMonth].push(tempObject);
    onupdaTer(new Date());

    onTableData(tempTable);
    Alert.alert('Created', 'Successfully Created new user!', [{text: 'OK'}]);
  };

  useEffect(() => {
    // find today data in side tabledata
    if (currentUser) {
      const tempYear = tableData.find(
        x => x.year === DefaultTime.getFullYear(),
      );
      var todayExist = tempYear.months[currMonth].some(
        x => x.day === currDay && x.userId === currentUser.userId,
      );
      ontodayExist(todayExist);
    }
  }, [tableData, currentUser, updaTer]);

  return (
    <>
      <CustView marT={20} width={`${windowWidth}px`}>
        <NMorph
          ofl="hidden"
          borR={20}
          sadR={7}
          height={windowHeight / 2 - 40}
          width={windowWidth * 0.8}>
          <CustView borR={20} ofl="hidden" height="100%">
            <LinearGradient
              style={{
                height: '100%',
                width: windowWidth * 0.8,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 15,
                flexDirection: 'column',
              }}
              colors={['#93FFF8', 'pink']}>
              {/* this handles title and Remove/absent data */}
              {/* probleam is here */}

              {todayExist ? (
                <>
                  <CusT color = 'grey' size={40} width="100%" textAlign="center">
                    Today's data of
                  </CusT>
                  <CusT
                    width="100%"
                    size={40}
                    weight="bold"
                    color="green"
                    textAlign="center">
                    {currentUser && currentUser.name}
                  </CusT>
                  <CusT color = 'grey' size={40} width="100%" textAlign="center">
                    already Exists.
                  </CusT>
                </>
              ) : (
                <>
                  <CustView
                    width="100%"
                    fdr="row"
                    ali="space-between"
                    jus="space-around">
                    {/* edit data */}
                    <CustView
                      jus="center"
                      ali="center"
                      padd={10}
                      width="150px"
                      borR={10}
                      // marT={60}
                      bcC="green">
                      <CusT
                        weight="bold"
                        textAlign="center"
                        size={20}
                        color="#fff">
                        {currentUser && currentUser.name}
                      </CusT>
                    </CustView>
                    {/* this is remove button */}
                    <CustView
                      onpress={() => {
                        Alert.alert(
                          'Alert!!',
                          'Are you sure you were absent!',
                          [
                            {text: 'Cancel', style: 'cancel'},
                            {text: 'OK', onPress: () => AbsentUser()},
                          ],
                        );
                      }}
                      height="40px"
                      width="40px"
                      borR={50}
                      bcC="red"
                      touchable
                      // tofl
                      tblC="green"
                      jus="center">
                      <CusT color="#fff" weight="bold" marT={-12} size={50}>
                        -
                      </CusT>
                    </CustView>
                  </CustView>

                  <CustView
                    fdr="row"
                    height="80px"
                    borR={15}
                    ofl="hidden"
                    width="100%">
                    <CustView width="50%">
                      <CusT
                        width="90%"
                        color="grey"
                        marL={20}
                        weight="bold"
                        size={20}>
                        Start
                      </CusT>
                      <CustView
                        onpress={() => {
                          showTimePicker(
                            startTime.length > 0 ? startTime : 'start',
                          );
                          onactiveStart(true);
                        }}
                        border="1px solid grey"
                        width="90%"
                        jus="center"
                        touchable
                        tblC="green"
                        tofl
                        ali="center"
                        height="45px"
                        borR={10}>
                        <CusT color = 'grey'>{startTime}</CusT>
                      </CustView>
                    </CustView>
                    <CustView width="50%">
                      <CusT
                        width="90%"
                        marL={20}
                        textAlign="left"
                        marB={5}
                        color="grey"
                        weight="bold"
                        size={20}>
                        Over
                      </CusT>
                      {/* this is a button for over time */}

                      <CustView
                        onpress={() => {
                          showTimePicker(
                            overTime.length > 1 ? overTime : 'over',
                          );
                          onactiveStart(false);
                        }}
                        border="1px solid grey"
                        width="90%"
                        jus="center"
                        touchable
                        tblC="green"
                        tofl
                        ali="center"
                        height="45px"
                        borR={10}>
                        <CusT  color = 'grey'>{overTime}</CusT>
                      </CustView>

                      <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        date={DefaultTime}
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                      />
                    </CustView>
                  </CustView>

                  <CustView
                    fdr="row"
                    height="120px"
                    borR={15}
                    ofl="hidden"
                    width="100%">
                    <CustView width="50%">
                      <CusT
                        width="90%"
                        color="grey"
                        marL={20}
                        marB={5}
                        weight="bold"
                        size={20}>
                        Pass Hours
                      </CusT>
                      <TextInput
                        value={passHours.toString()}
                        onChangeText={text => onpassHours(text)}
                        keyboardType="numeric"
                        style={{
                          borderWidth: 1,
                          borderColor: 'grey',
                          fontSize: 20,
                          width: '95%',
                          paddingLeft: 20,
                          borderRadius: 10,
                        }}
                        placeholder="0.25 = 15 Min"
                      />
                    </CustView>
                    <CustView width="50%">
                      <CusT
                        width="90%"
                        color="grey"
                        marL={20}
                        weight="bold"
                        size={20}>
                        Remarks
                      </CusT>
                      <TextInput
                        value={Remarks}
                        onChangeText={text => onRemarks(text)}
                        style={{
                          borderWidth: 1,
                          borderColor: 'grey',
                          fontSize: 20,
                          width: '95%',
                          paddingLeft: 20,
                          borderRadius: 10,
                        }}
                      />
                    </CustView>
                  </CustView>

                  <CustView
                    onpress={() => {
                      UpdateData();
                    }}
                    height="40px"
                    jus="center"
                    ali="center"
                    width="150px"
                    borR={15}
                    touchable
                    // marT={60}
                    bcC="blue">
                    <CusT
                      letterSpacing={4}
                      weight="bold"
                      textAlign="center"
                      size={20}
                      color="#fff">
                      SUBMIT
                    </CusT>
                  </CustView>
                </>
              )}
            </LinearGradient>
          </CustView>
        </NMorph>
      </CustView>
    </>
  );
};
