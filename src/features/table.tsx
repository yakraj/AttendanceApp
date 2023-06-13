import {Topbar} from '../components/topbar';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {CustView} from '../components/devider';
import CusT from '../components/custom.text';
import {MainContext} from '../services/main.context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {useRoute} from '@react-navigation/native';
type renderType = {
  item: object;
  navigation: any;
};

type tableCtype = {
  text: string;
  width: string;
  title?: boolean;
  height?: string;
};
const TableContent = ({text, width, height, title}: tableCtype) => {
  return (
    <CustView
      height={height}
      width={width}
      jus="center"
      border="1px solid grey"
      height={height ? height : '45px'}>
      <CusT color="grey" weight={title ? 'bold' : 'normal'} textAlign="center">
        {text}
      </CusT>
    </CustView>
  );
};

export const Table = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {tableData, CurMOD, userData, ActiveUser, onTableData} =
    useContext(MainContext);
  const {year, month, userId}: {year: number; month: string; userId: string} =
    route.params;
  const [TableData, onTableDataa] = useState<any>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const FindCorrect = () => {
    let getYearData = tableData.filter((x: any) => x.year === year);
    if (getYearData.length) {
      let getMonthData = getYearData[0].months[month];
      let FindUserData = getMonthData.filter((x: any) => x.userId === userId);
      onTableDataa(FindUserData);
    }
  };

  // useFocusEffect

  useFocusEffect(
    React.useCallback(() => {
      // filter activeuser data from curmod
      FindCorrect();
    }, [ActiveUser, tableData]),
  );

  useEffect(() => {
    fetchData();
  }, []);
  const handleRefresh = () => {
    console.log('refreshing');
    setRefreshing(true);
    fetchData();
  };

  const fetchData = () => {
    // Simulating data fetching from an API
    setTimeout(() => {
      let tempdata = [...tableData];
      onTableData(tempdata);
      setRefreshing(false);
    }, 2000);
  };

  const ExportPdf = {
    table: TableData,
    user: userData.filter(x => x.userId === ActiveUser),
  };
  const renderItem = ({item}: renderType) => (
    <CustView
      touchable
      onpress={() => navigation.navigate('editData', {id: item.uniqId})}
      width="100%"
      fdr="row"
      jus="center">
      <TableContent text={item.day} width="16%" />
      <TableContent text={item.startTime} width="16%" />
      <TableContent text={item.overTime} width="16%" />
      <TableContent text={item.leaveTime} width="16%" />
      <TableContent text={item.totalHours} width="16%" />
      <TableContent text={item.remarks} width="16%" />
    </CustView>
  );

  return (
    <>
      <Topbar pdf={ExportPdf} title={`${month}/${year}`} />
      {/* this is table header data */}
      <CustView padT={20} ofl="hidden" width="100%" jus="center" fdr="row">
        <TableContent title text="DAY" width="16%" />
        <TableContent title text="Start Time" width="16%" />
        <TableContent title text="OVER Time" width="16%" />
        <TableContent title text="LEAVE Time" width="16%" />
        <TableContent title text="TOTAL HOURS" width="16%" />
        <TableContent title text="REMARKS" width="16%" />
      </CustView>
      {TableData.length ? (
        <FlatList
          data={TableData}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          keyExtractor={item => item.day}
        />
      ) : (
        <CusT
          width="100%"
          textAlign="center"
          size={40}
          weight="bold"
          color="red">
          No Data Available
        </CusT>
      )}
    </>
  );
};
