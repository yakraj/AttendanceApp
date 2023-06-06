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
    let sumSalary =
      basicSalary + otSalary - user[0].esic - user[0].exCharge - PF;

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
      <div
        id="id1683720844070"
        style="
          height: 63px;
          width: 100%;
          position: relative;
          box-sizing: border-box;
          display: flex;
          margin-top: 30px;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background: rgb(255, 255, 255);
        "
      >
        <h1 style="margin: 0px; font-size: 2rem; text-transform: uppercase;">
          ${user[0].company}
        </h1>
        <h1 style="margin: 0px; font-weight: normal; font-size: 1.3rem;">
          ${
            currYear.toString().toUpperCase() +
            ' ' +
            currMonth.toString().toUpperCase()
          } month salary details
        </h1>
      </div>
      <div
        id="id1683721076710"
        style="
          height: auto;
          width: 100%;
          position: relative;
          box-sizing: border-box;
          display: flex;
          border-bottom: 2px solid grey;
          margin-top: 30px;
        "
      >
        <div
          id="id1683721110199"
          style="
            height: auto;
            width: 45%;
            position: relative;
            box-sizing: border-box;
            display: flex;
            border-top: none;
            border-right: 2px solid grey;
            border-bottom: none;
            border-left: none;
            border-image: initial;
          "
        >
          <p style="margin: 0px; font-weight: bold; ">Employee Name :</p>
          <p
            style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto; text-transform: capitalize;"
          >
          ${user[0].name}
          </p>
        </div>
        <div
          id="id1683721110199"
          style="
            height: auto;
            width: 25%;
            position: relative;
            box-sizing: border-box;
            display: flex;
            border-right: 2px solid grey;
            justify-content: center;
          "
        >
          <p style="margin: 0px; font-weight: bold;">PF :</p>
          <p
            style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto;"
          >
            Rs. ${PF}
          </p>
        </div>
        <div
          id="id1683721110199"
          style="
            height: auto;
            width: 25%;
            position: relative;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
          "
        >
          <p style="margin: 0px; font-weight: bold;">Working Hours:</p>
          <p
            style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto;"
          >
            ${sumhours}
          </p>
        </div>
      </div>
      <div
        id="id1683721076710"
        style="
          height: auto;
          width: 100%;
          position: relative;
          box-sizing: border-box;
          margin-top: 10px;
          display: flex;
          border-bottom: 2px solid grey;
        "
      >
        <div
          id="id1683721110199"
          style="
            height: auto;
            width: 33%;
            position: relative;
            box-sizing: border-box;
            display: flex;
            border-right: 2px solid grey;
          "
        >
          <p style="margin: 0px; font-weight: bold;">Working Days :</p>
          <p
            style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto;"
          >
            ${BasicWorkDays}
          </p>
        </div>
        <div
          id="id1683721110199"
          style="
            height: auto;
            width: 33%;
            position: relative;
            box-sizing: border-box;
            display: flex;
            border-right: 2px solid grey;
            justify-content: center;
          "
        >
          <p style="margin: 0px; font-weight: bold;">Over Time :</p>
          <p
            style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto;"
          >
            ${OThours}
          </p>
        </div>
        <div
          id="id1683721110199"
          style="
            height: auto;
            width: 33%;
            position: relative;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
          "
        >
          <p style="margin: 0px; font-weight: bold;">Gate Pass Time (hr) :</p>
          <p
            style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto;"
          >
            ${gatePass}
          </p>
        </div>
      </div>
      <div
        id="id1683721076710"
        style="
          height: auto;
          width: 100%;
          position: relative;
          box-sizing: border-box;
          margin-top: 10px;
          display: flex;
          border-bottom: 2px solid grey;
        "
      >
        <div
          id="id1683721110199"
          style="
            height: auto;
            width: 50%;
            position: relative;
            box-sizing: border-box;
            display: flex;
            border-right: 2px solid grey;
          "
        >
          <p style="margin: 0px; font-weight: bold;">Basic Salary :</p>
          <p
            style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto;"
          >
            Rs. ${basicSalary}
          </p>
        </div>
        <div
          id="id1683721110199"
          style="
            height: auto;
            width: 50%;
            position: relative;
            border-right: 2px solid grey;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
          "
        >
          <p style="margin: 0px; font-weight: bold;">OT Amount :</p>
          <p
            style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto;"
          >
            Rs. ${otSalary}
          </p>
        </div>
        <div
          id="id1683721110199"
          style="
            height: auto;
            width: 50%;
  
            position: relative;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
          "
        >
          <p style="margin: 0px; font-weight: bold;">Total (incl) :</p>
          <p
            style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto;"
          >
            Rs. ${sumSalary.toString().substring(0, 8)}
          </p>
        </div>
      </div>
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
