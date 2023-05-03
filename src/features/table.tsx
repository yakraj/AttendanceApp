import {Topbar} from '../components/topbar';
import React from 'react';
import {FlatList} from 'react-native';
import {CustView} from '../components/devider';
import CusT from '../components/custom.text';
const TableData = [
  {
    day: 'Monday',
    startTime: '9:00 AM',
    overTime: '6:00 PM',
    leaveTime: '6:30 PM',
    totalHours: '9.5',
    remarks: 'Worked on project X',
  },
  {
    day: 'Tuesday',
    startTime: '8:30 AM',
    overTime: '5:30 PM',
    leaveTime: '6:00 PM',
    totalHours: '8.5',
    remarks: 'Meetings all day',
  },
  {
    day: 'Wednesday',
    startTime: '9:15 AM',
    overTime: '6:15 PM',
    leaveTime: '6:45 PM',
    totalHours: '9.5',
    remarks: 'Worked on project Y',
  },
  {
    day: 'Thursday',
    startTime: '8:45 AM',
    overTime: '5:45 PM',
    leaveTime: '6:15 PM',
    totalHours: '9',
    remarks: 'Worked on project X',
  },
  {
    day: 'Friday',
    startTime: '9:30 AM',
    overTime: '6:30 PM',
    leaveTime: '7:00 PM',
    totalHours: '9.5',
    remarks: 'Worked on project Z',
  },
  {
    day: 'Saturday',
    startTime: '9:00 AM',
    overTime: '6:00 PM',
    leaveTime: '6:30 PM',
    totalHours: '9.5',
    remarks: 'Worked on project X',
  },
  {
    day: 'Sunday',
    startTime: '',
    overTime: '',
    leaveTime: '',
    totalHours: '',
    remarks: '',
  },
  {
    day: '',
    startTime: '',
    overTime: '',
    leaveTime: '',
    totalHours: '',
    remarks: '',
  },
  {
    day: '',
    startTime: '',
    overTime: '',
    leaveTime: '',
    totalHours: '',
    remarks: '',
  },
  {
    day: '',
    startTime: '',
    overTime: '',
    leaveTime: '',
    totalHours: '',
    remarks: '',
  },
];

type renderType = {
  item: object;
};
const renderItem = ({item}: renderType) => (
  <CustView width="90%">
    <TableContent text={item.day} width="10%" />
    <TableContent text={item.startTime} width="10%" />
    <TableContent text={item.overTime} width="10%" />
    <TableContent text={item.leaveTime} width="10%" />
    <TableContent text={item.totalHours} width="10%" />
    <TableContent text={item.remarks} width="10%" />
  </CustView>
);

type tableCtype = {
  text: string;
  width: string;
};
const TableContent = ({text, width}: tableCtype) => {
  return (
    <CustView width={width}>
      <CusT>{text}</CusT>
    </CustView>
  );
};

export const Table = () => {
  return (
    <>
      <Topbar title="FEB/2023" tableData />
      {/* this is table header data */}
      <CustView width="90%">
        <TableContent text="DAY" width="10%" />
        <TableContent text="Start Time" width="10%" />
        <TableContent text="OVER Time" width="10%" />
        <TableContent text="LEAVE Time" width="10%" />
        <TableContent text="TOTAL HOURS" width="10%" />
        <TableContent text="REMARKS" width="10%" />
      </CustView>
      <FlatList
        data={TableData}
        renderItem={renderItem}
        keyExtractor={item => item.day}
      />
    </>
  );
};
