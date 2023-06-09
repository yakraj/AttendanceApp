import LinearGradient from 'react-native-linear-gradient';
import CusT from '../components/custom.text';
import moment from 'moment';
import {CustView, NMorph} from '../components/devider';
import {TextInput, Alert} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Topbar} from '../components/topbar';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {MainContext} from '../services/main.context';
import {windowHeight, windowWidth} from '../components/utilitis';
export const EditData = () => {
  const {
    tableData,
    onTableData,
    startTime,
    onstartTime,
    overTime,
    onoverTime,
    Remarks,
    onRemarks,
  } = useContext(MainContext);
  const route = useRoute();
  const navigation = useNavigation();
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const [passHours, onpassHours] = useState('');
  const [activeStart, onactiveStart] = useState(true);
  const {id} = route.params;
  const [PrevData, onPrevData] = useState();
  const [DType, setDType] = useState('regular');
  const [DefaultTime, onDefaultTime] = useState(new Date());

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

  useEffect(() => {
    if (PrevData) {
      onstartTime(PrevData.startTime);
      onoverTime(PrevData.overTime);
      onpassHours(PrevData.leaveTime);
      onRemarks(PrevData.remarks);
      onRemarks(PrevData.remarks);
      if (PrevData.dtype) {
        setDType(PrevData.dtype);
      }
    }
  }, [PrevData]);

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
    // updating object
    for (const obj of tempTable) {
      for (const month in obj.months) {
        const data = obj.months[month];
        const targetObj = data.find(item => item.uniqId === id);
        if (targetObj) {
          targetObj.startTime = '-';
          targetObj.overTime = '-';
          targetObj.leaveTime = 0;
          targetObj.totalHours = 0;
          targetObj.remarks = Remarks ? Remarks : 'Absent';
          break;
        }
      }
    }
    onTableData(tempTable);
    return navigation.goBack();
  };
  // update data of user
  const UpdateData = () => {
    // Create a copy of the tableData state
    let updatedTableData = [...tableData];
    if (startTime === '-' || overTime === '-') {
      return;
    }
    console.log('it is executing', startTime);
    // Update the object
    for (const obj of updatedTableData) {
      for (const month in obj.months) {
        const data = obj.months[month];
        const targetObj = data.find(item => item.uniqId === id);
        if (targetObj) {
          targetObj.startTime = startTime;
          targetObj.overTime = overTime;
          targetObj.leaveTime = Number(passHours);
          targetObj.totalHours = TimeDifference();
          targetObj.remarks = Remarks;
          targetObj.dtype = DType;
          break;
        }
      }
    }

    // Update the state with the modified tableData

    onTableData(updatedTableData);

    Alert.alert('Created', 'Successfully Updated your Data!', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  return (
    <>
      <Topbar title="Edit Data" />
      <CustView height="80%" jus="center" ali="center" width="100%">
        <NMorph
          ofl="hidden"
          borR={15}
          sadR={5}
          TC="pink"
          marB={20}
          height={windowHeight * 0.45}
          width={windowWidth * 0.8}>
          <CustView borR={20} height="100%" width="100%">
            <LinearGradient
              style={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
              colors={['#93FFF8', '#8B757509']}>
              {/* this handles title and Remove/absent data */}
              <CustView
                width="100%"
                fdr="row"
                ali="space-between"
                jus="space-around">
                {/* edit data */}
                <CustView
                  height="40px"
                  jus="center"
                  ali="center"
                  width="150px"
                  borR={15}
                  // marT={60}
                  bcC="green">
                  <CusT weight="bold" textAlign="center" size={20} color="#fff">
                    Edit Data
                  </CusT>
                </CustView>
                {/* this is remove button */}
                <CustView
                  onpress={() => {
                    Alert.alert('Alert!!', 'Are you sure you were absent!', [
                      {text: 'Cancel', style: 'cancel'},
                      {text: 'OK', onPress: () => AbsentUser()},
                    ]);
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
                    color="grey"
                    width="90%"
                    marL={20}
                    weight="bold"
                    size={20}>
                    Start
                  </CusT>
                  <CustView
                    onpress={() => {
                      showTimePicker(
                        startTime.length > 1 ? startTime : 'start',
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
                    <CusT color="grey">{startTime}</CusT>
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
                      showTimePicker(overTime.length > 1 ? overTime : 'over');
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
                    <CusT color="grey"> {overTime}</CusT>
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
                    color="grey"
                    width="90%"
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
                    color="grey"
                    width="90%"
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
                fdr="row"
                width="100%"
                padL={10}
                padR={10}
                marB={10}
                jus="space-between">
                <CusT size="20" weight="bold">
                  Duty Type
                </CusT>
                {/* this is container for regular and ot */}
                <CustView fdr="row">
                  <CustView
                    touchable
                    tblC="blue"
                    onpress={() => {
                      setDType('regular');
                    }}
                    bcC={DType === 'regular' ? 'green' : 'grey'}
                    marR={5}
                    padd={10}
                    borR={10}>
                    <CusT color="#fff" weight="bold" letterSpacing="2">
                      Regular
                    </CusT>
                  </CustView>
                  <CustView
                    touchable
                    tblC="blue"
                    onpress={() => {
                      setDType('ot');
                    }}
                    bcC={DType === 'ot' ? 'green' : 'grey'}
                    padd={10}
                    borR={10}>
                    <CusT color="#fff" weight="bold" letterSpacing="2">
                      OT
                    </CusT>
                  </CustView>
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
            </LinearGradient>
          </CustView>
        </NMorph>
      </CustView>
    </>
  );
};
