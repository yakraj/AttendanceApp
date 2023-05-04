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
  <CustView width="100%" fdr="row" jus="center">
    <TableContent text={item.day} width="16%" />
    <TableContent text={item.startTime} width="16%" />
    <TableContent text={item.overTime} width="16%" />
    <TableContent text={item.leaveTime} width="16%" />
    <TableContent text={item.totalHours} width="16%" />
    <TableContent text={item.remarks} width="16%" />
  </CustView>
);

type tableCtype = {
  text: string;
  width: string;
  title?: boolean;
};
const TableContent = ({text, width, title}: tableCtype) => {
  return (
    <CustView width={width} border="1px solid grey" height="100%">
      <CusT weight={title ? 'bold' : 'normal'} textAlign="center">
        {text}
      </CusT>
    </CustView>
  );
};

export const Table = () => {
  return (
    <>
      <Topbar title="FEB/2023" />
      {/* this is table header data */}
      <CustView padT={20} ofl="hidden" width="100%" jus="center" fdr="row">
        <TableContent title text="DAY" width="16%" />
        <TableContent title text="Start Time" width="16%" />
        <TableContent title text="OVER Time" width="16%" />
        <TableContent title text="LEAVE Time" width="16%" />
        <TableContent title text="TOTAL HOURS" width="16%" />
        <TableContent title text="REMARKS" width="16%" />
      </CustView>
      <FlatList
        data={TableData}
        renderItem={renderItem}
        keyExtractor={item => item.day}
      />
    </>
  );
};
