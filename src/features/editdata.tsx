import LinearGradient from 'react-native-linear-gradient';
import CusT from '../components/custom.text';
import moment from 'moment';
import {CustView} from '../components/devider';
import {TextInput, Alert} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Topbar} from '../components/topbar';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {MainContext} from '../services/main.context';
export const EditData = () => {
  const {tableData, onTableData} = useContext(MainContext);
  const route = useRoute();
  const navigation = useNavigation();
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [startTime, onstartTime] = useState('');
  const [overTime, onoverTime] = useState('');
  const [passHours, onpassHours] = useState('');
  const [Remarks, onRemarks] = useState('');
  const [activeStart, onactiveStart] = useState(true);
  const {id} = route.params;
  const [PrevData, onPrevData] = useState();
  const showTimePicker = () => {
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
          if (result) break;
        }
        if (result) break;
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
    const time1 = moment(startTime, format);
    const time2 = moment(overTime, format);

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
    let tempTable = tableData;

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
    Alert.alert('Created', 'Successfully Created new user!', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };
  // update data of user
  const UpdateData = () => {
    let tempTable = tableData;

    // updating object
    for (const obj of tempTable) {
      for (const month in obj.months) {
        const data = obj.months[month];
        const targetObj = data.find(item => item.uniqId === id);
        if (targetObj) {
          targetObj.startTime = startTime;
          targetObj.overTime = overTime;
          targetObj.leaveTime = Number(passHours);
          targetObj.totalHours = TimeDifference();
          targetObj.remarks = Remarks;
          break;
        }
      }
    }
    onTableData(tempTable);
    Alert.alert('Created', 'Successfully Created new user!', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  return (
    <>
      <Topbar title="Edit Data" />
      <CustView height="80%" jus="center" ali="center" width="100%">
        <CustView borR={20} height="50%" width="80%">
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
                onpress={() => AbsentUser()}
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
                <CusT width="90%" marL={20} weight="bold" size={20}>
                  Start
                </CusT>
                <CustView
                  onpress={() => {
                    showTimePicker();
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
                  <CusT>{startTime}</CusT>
                </CustView>
              </CustView>
              <CustView width="50%">
                <CusT
                  width="90%"
                  marL={20}
                  textAlign="left"
                  marB={5}
                  weight="bold"
                  size={20}>
                  Over
                </CusT>
                {/* this is a button for over time */}

                <CustView
                  onpress={() => {
                    showTimePicker();
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
                  <CusT>{overTime}</CusT>
                </CustView>

                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
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
                <CusT width="90%" marL={20} marB={5} weight="bold" size={20}>
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
                <CusT width="90%" marL={20} weight="bold" size={20}>
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
          </LinearGradient>
        </CustView>
      </CustView>
    </>
  );
};
