import {CustView, MyImage} from './devider';
import React, {useState} from 'react';
import CusT from './custom.text';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {PermissionsAndroid} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {currMonth} from '../services/main.context';

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

  // create folder;
  // this is my pdf file
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
        Dynamic Mega-Tech Engg. Pvt. Ltd.
      </h1>
      <h1 style="margin: 0px; font-weight: normal; font-size: 1.3rem;">
        Monthly Salary Details
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
        <p style="margin: 0px; font-weight: bold;">Employee Name :</p>
        <p
          style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto;"
        >
          Yakraj Pariyar
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
        <p style="margin: 0px; font-weight: bold;">Working Days:</p>
        <p
          style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto;"
        >
          30
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
          30
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
        <p style="margin: 0px; font-weight: bold;">Working Hours :</p>
        <p
          style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto;"
        >
          50
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
          22
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
          22
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
          Rs. 10000
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
          Rs. 240
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
        <p style="margin: 0px; font-weight: bold;">Total :</p>
        <p
          style="margin: 0px 0px 0px 10px; font-weight: normal; height: auto;"
        >
          Rs. 240
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
          <tr>
            <td>1</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 1</td>
          </tr>
          <tr>
            <td>2</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 2</td>
          </tr>
          <tr>
            <td>3</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 3</td>
          </tr>
          <tr>
            <td>4</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 4</td>
          </tr>
          <tr>
            <td>5</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 5</td>
          </tr>
          <tr>
            <td>6</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 6</td>
          </tr>
          <tr>
            <td>7</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 7</td>
          </tr>
          <tr>
            <td>8</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 8</td>
          </tr>
          <tr>
            <td>9</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 9</td>
          </tr>
          <tr>
            <td>10</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 10</td>
          </tr>
          <tr>
            <td>11</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 11</td>
          </tr>
          <tr>
            <td>12</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 12</td>
          </tr>
          <tr>
            <td>13</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 13</td>
          </tr>
          <tr>
            <td>14</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 14</td>
          </tr>
          <tr>
            <td>15</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 15</td>
          </tr>
          <tr>
            <td>16</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 16</td>
          </tr>
          <tr>
            <td>17</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 17</td>
          </tr>
          <tr>
            <td>18</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 18</td>
          </tr>
          <tr>
            <td>19</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 19</td>
          </tr>
          <tr>
            <td>20</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 20</td>
          </tr>
          <tr>
            <td>21</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 21</td>
          </tr>
          <tr>
            <td>22</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 22</td>
          </tr>
          <tr>
            <td>23</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 23</td>
          </tr>
          <tr>
            <td>24</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 24</td>
          </tr>
          <tr>
            <td>25</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 25</td>
          </tr>
          <tr>
            <td>26</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 26</td>
          </tr>
          <tr>
            <td>27</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 27</td>
          </tr>
          <tr>
            <td>28</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 28</td>
          </tr>
          <tr>
            <td>29</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 29</td>
          </tr>
          <tr>
            <td>30</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 30</td>
          </tr>
          <tr>
            <td>31</td>
            <td>8:00 AM</td>
            <td>1 hour</td>
            <td>30 minutes</td>
            <td>8.5</td>
            <td>Example remark 31</td>
          </tr>
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
    fileName: `${currMonth} Attendance Report`,
    directory: RNFS.CachesDirectoryPath,
    pageSize: 'A4', // Set the page size (e.g., 'A4', 'Letter', 'Legal', etc.)
    width: 595, // Set the width of the page (in points)
    height: 842,
  };
  // this all data is for pdf;
  const createPDF = async () => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        console.log('Storage permission denied');
        return;
      }

      let file = await RNHTMLtoPDF.convert(options);

      // Save the PDF file to the Download folder
      const fileName = `${currMonth} Attendance Report.pdf`;
      const downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      await RNFS.copyFile(file.filePath, downloadPath);
      await RNFS.scanFile(downloadPath);
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  };

  return (
    <>
      <CustView fdr="row" ali="center" jus="space-around" marT={5}>
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

        <CustView
          height="50px"
          width={isTable || pdf ? '60%' : '80%'}
          bcC="red"
          borR={50}
          ofl="hidden">
          <LinearGradient
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: 15,
            }}
            colors={['#82FFFF', '#CEFFCA']}>
            <CusT weight="bold" size={25}>
              {title}
            </CusT>
          </LinearGradient>
        </CustView>
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
