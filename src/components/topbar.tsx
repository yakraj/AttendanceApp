import {CustView, MyImage, NMorph} from './devider';
import React, {useEffect} from 'react';
import CusT from './custom.text';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {PermissionsAndroid, Alert} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {currMonth, currYear} from '../services/main.context';
import {windowWidth} from './utilitis';
import PushNotification from 'react-native-push-notification';
// import Share from 'react-native-share';
interface Props {
  title: string;
  isTable?: true | false;
  route?: object;
  pdf?: any;
}
const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to create a directory.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
export const Topbar = ({title, isTable, route, pdf}: Props) => {
  const navigation = useNavigation();

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'doanload-successful-channel',
        channelName: 'Download successful',
        channelDescription: 'On completation of download file.',
        importance: PushNotification.Importance.HIGH,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  }, []);

  const sendTrialNotification = () => {
    PushNotification.localNotification({
      /* Android Only Properties */
      color: 'blue', // Notification color
      vibrate: true, // Vibrate on notification
      vibration: 300, // Vibration duration
      priority: 'high', // Notification priority
      channelId: 'doanload-successful-channel',
      /* iOS and Android properties */
      title: 'PDF Downloaded Successfully', // Notification title
      message: 'Please open your download file on file manager.', // Notification message
      playSound: true, // Play a sound on notification
      soundName: 'default', // Sound to play (default is the default notification sound)
    });
  };

  var concatenatedData = '';

  // this all data is for pdf;
  const createPDF = async () => {
    const {table, user} = pdf;
    // create folder;
    table.forEach(function (x) {
      concatenatedData += `<tr>
      <td>${x.day}</td>
      <td>${x.startTime}</td>
      <td>${x.overTime}</td>
      <td>${x.leaveTime}</td>
      <td>${x.totalHours}</td>
      <td>${x.remarks}</td>
    </tr>`;
    });
    // total hours
    var sumhours = 0;

    table.forEach(function (item) {
      sumhours += item.totalHours;
    });

    // find basic working days
    let BasicWorkDays = table.filter(x => x.totalHours >= 8).length;
    // find ot hours
    let OThours = sumhours - BasicWorkDays * 8;
    // find gatepass time
    let gatePass = 0;
    table.forEach(function (item) {
      gatePass += item.leaveTime;
    });
    // FIND PF AMOUNT
    let PF = (BasicWorkDays * 8 * user[0].salph * user[0].pf) / 100;

    // find basic salary
    let basicSalary = BasicWorkDays * 8 * user[0].salph;
    // find Ot salary
    let otSalary = OThours * user[0].salph;
    // find sum salary
    let esic = user[0].esic ? basicSalary * 0.0075 : 0;
    let sumSalary = basicSalary + otSalary - esic - user[0].exCharge - PF;

    let options = {
      html: ` 
      <style>
        @page {
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          padding:15px;
          display: flex;
          justify-content: center;
        }
        table {
          margin-top: 10px;
          width: 100%;
          border-collapse: collapse;
        }
  
        th,
        td {
          padding: 2px 8px;
          font-size: 1rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
  
        th {
          background-color: #f2f2f2;
        }
      </style>
      <div
      id="id1683720549688"
      style="
        height: 100%;
        width: 100%;
        position: relative;
        box-sizing: border-box;
      "
    > 
      
    
    
<table class="tg" style="border-collapse: collapse;border-spacing: 0;">
<thead>
  <tr>
    <th class="tg-mj3y" colspan="3" style="border-color: black;border-style: solid;border-width: 1px;font-family: Arial, sans-serif;font-size: 100%;font-weight: normal;overflow: hidden;padding: 10px 5px;word-break: normal;background-color: #c0c0c0;text-align: left;vertical-align: top;"><span style="font-weight:bold; font-size: 1.5rem; text-transform: uppercase"> ${
      user[0].company
    }</span>  <span style="font-style:italic">Payment Details for the month  
    ${title.toUpperCase()}
    </span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0lax" style="border-color: black;border-style: solid;border-width: 1px;font-family: Arial, sans-serif;font-size: 14px;overflow: hidden;padding: 10px 5px;word-break: normal;text-align: left;vertical-align: top;"><span style="font-weight:bold">Employee Name: </span> ${
      user[0].name
    }</td>
    <td class="tg-0lax" style="border-color: black;border-style: solid;border-width: 1px;font-family: Arial, sans-serif;font-size: 14px;overflow: hidden;padding: 10px 5px;word-break: normal;text-align: left;vertical-align: top;"><span style="font-weight:bold">Basic : </span>${basicSalary}</td>
    <td class="tg-0lax" style="border-color: black;border-style: solid;border-width: 1px;font-family: Arial, sans-serif;font-size: 14px;overflow: hidden;padding: 10px 5px;word-break: normal;text-align: left;vertical-align: top;"><span style="font-weight:bold">ESIC (0.075%) :</span> ${esic}</td>
  </tr>
  <tr>
    <td class="tg-0lax" style="border-color: black;border-style: solid;border-width: 1px;font-family: Arial, sans-serif;font-size: 14px;overflow: hidden;padding: 10px 5px;word-break: normal;text-align: left;vertical-align: top;"><span style="font-weight:bold">O.T Amount:</span> ${otSalary}</td>
    <td class="tg-0lax" style="border-color: black;border-style: solid;border-width: 1px;font-family: Arial, sans-serif;font-size: 14px;overflow: hidden;padding: 10px 5px;word-break: normal;text-align: left;vertical-align: top;"><span style="font-weight:bold">Present  days:</span>   ${BasicWorkDays}</td>
    <td class="tg-0lax" style="border-color: black;border-style: solid;border-width: 1px;font-family: Arial, sans-serif;font-size: 14px;overflow: hidden;padding: 10px 5px;word-break: normal;text-align: left;vertical-align: top;"><span style="font-weight:bold">PF (12%) :</span>${PF} </td>
  </tr>
  <tr>
    <td class="tg-0lax" style="border-color: black;border-style: solid;border-width: 1px;font-family: Arial, sans-serif;font-size: 14px;overflow: hidden;padding: 10px 5px;word-break: normal;text-align: left;vertical-align: top;"><span style="font-weight:bold">O.T Hours :</span>  ${OThours}</td>
    <td class="tg-0lax" style="border-color: black;border-style: solid;border-width: 1px;font-family: Arial, sans-serif;font-size: 14px;overflow: hidden;padding: 10px 5px;word-break: normal;text-align: left;vertical-align: top;"><span style="font-weight:bold">Gate Pass (hrs.) :</span> ${gatePass}</td>
    <td class="tg-0lax" style="border-color: black;border-style: solid;border-width: 1px;font-family: Arial, sans-serif;font-size: 14px;overflow: hidden;padding: 10px 5px;word-break: normal;text-align: left;vertical-align: top;"><span style="font-weight:bold">IOU :</span> ${
      user[0].exCharge
    }</td>
  </tr>
  <tr>
    <td class="tg-0lax" colspan="2" style="border-color: black;border-style: solid;border-width: 1px;font-family: Arial, sans-serif;font-size: 14px;overflow: hidden;padding: 10px 5px;word-break: normal;text-align: left;vertical-align: top;"><span style="font-weight:bold">Total Payable Amount :</span> ${sumSalary
      .toString()
      .substring(0, 8)}</td>
    <td class="tg-0lax" style="border-color: black;border-style: solid;border-width: 1px;font-family: Arial, sans-serif;font-size: 14px;overflow: hidden;padding: 10px 5px;word-break: normal;text-align: left;vertical-align: top;"><span style="font-weight:bold">Tot.deduction :</span> ${
      esic + user[0].exCharge + PF
    }</td>
  </tr>
</tbody>
</table>

      <div
        id="id1683722024862"
        style="
          height: auto;
          width: 100%;
          margin-top: 20px;
          position: relative;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          border-bottom: 2px solid grey;
        "
      >
        <h1
          style="
            width: 100%;
            text-align: start;
            margin: 10px 0px 0px;
            font-size: 1.5rem;
            margin-top: 20px;
            text-decoration: none;
            border: none;
          "
        >
          Attendance Data
        </h1>
      </div>
      <div
        id="id1683722082908"
        style="
          height: auto;
          width: 100%;
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <table style="">
          <tbody>
            <tr>
              <th>Day</th>
              <th>Start Time</th>
              <th>Overtime</th>
              <th>Pass Time</th>
              <th>Total Hours</th>
              <th>Remarks</th>
            </tr>
           ${concatenatedData}
            
          </tbody>
        </table>
      </div>
      <div
        id="id1683722193227"
        style="
          height: 51px;
          width: 100%;
          position: relative;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-right: 50px;
        "
      >
        <p style="">Happy Working Days, By:</p>
        <a
          href="https://www.yakraj.com"
          target="_blank"
          style="margin-left: 10px;"
          >Yakraj</a
        >
      </div>
    </div>
  `,
      fileName: `${new Date().getDate()} ${currMonth} Attendance Report ${
        user[0].name
      }`,
      directory: RNFS.CachesDirectoryPath,
      pageSize: 'A4', // Set the page size (e.g., 'A4', 'Letter', 'Legal', etc.)
      width: 595, // Set the width of the page (in points)
      height: 842,
    };
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        console.log('Storage permission denied');
        return;
      }

      let file = await RNHTMLtoPDF.convert(options);

      // Save the PDF file to the Download folder
      const fileName = `${new Date().getDate()} ${currMonth} Attendance Report ${
        user[0].name
      }.pdf`;
      const downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      await RNFS.copyFile(file.filePath, downloadPath);
      await RNFS.scanFile(downloadPath);
      sendTrialNotification();
      Alert.alert(
        'File Saved',
        `File saved successfully on download file on your mobile as, \n \n ${new Date().getDate()} ${currMonth} Attendance Report ${
          user[0].name
        }.pdf`,
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'There is no download folder on your internal storage, please create the folder on the behalf to save the pdf.',
      );
    }
  };

  return (
    <>
      <CustView fdr="row" ali="center" padB={7} jus="space-around" marT={5}>
        <CustView
          onpress={() => navigation.goBack()}
          touchable
          tofl={true}
          tblC="#5CFFEB"
          height="auto">
          <MyImage
            style={{height: 50, width: 50}}
            source={require('../../assects/back.png')}
          />
        </CustView>

        <NMorph
          ofl="hidden"
          borR={50}
          sadR={2}
          TC="skyblue"
          height={50}
          width={isTable || pdf ? windowWidth * 0.6 : windowWidth * 0.8}>
          <CustView height="100%" width="100%" bcC="red" borR={50} ofl="hidden">
            <LinearGradient
              style={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 15,
              }}
              colors={['#82FFFF', '#CEFFCA']}>
              <CusT color="grey" weight="bold" size={25}>
                {title}
              </CusT>
            </LinearGradient>
          </CustView>
        </NMorph>
        {isTable && (
          <CustView
            onpress={() => navigation.navigate('table', route)}
            touchable
            tofl={true}
            tblC="#5CFFEB"
            height="auto">
            <MyImage
              style={{height: 50, width: 50}}
              source={require('../../assects/topbartable.png')}
            />
          </CustView>
        )}
        {pdf && (
          <CustView
            onpress={() => {
              createPDF();
            }}
            touchable
            tofl={true}
            tblC="red"
            height="auto">
            <MyImage
              style={{height: 50, width: 50}}
              source={require('../../assects/pdfreader.png')}
            />
          </CustView>
        )}
      </CustView>
    </>
  );
};
