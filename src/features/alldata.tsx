import CusT from '../components/custom.text';
import {CustView} from '../components/devider';
import {ScrollView} from 'react-native';
import {Topbar} from '../components/topbar';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

// year data

const YearScroll = () => {
  return (
    <CustView
      width="80px"
      marL={10}
      marR={10}
      borR={30}
      ofl="hidden"
      height="40px">
      <LinearGradient
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={['#FFA14A', '#E6C0FE']}>
        <CusT weight="bold" size={20}>
          2023
        </CusT>
      </LinearGradient>
    </CustView>
  );
};

type monthType = {
  month: string;
};
const MonthNames = ({month}: monthType) => {
  const navigation = useNavigation();

  return (
    <CustView
      touchable
      onpress={() => navigation.navigate('retrieve')}
      width="80px"
      marB={10}
      marT={10}
      borR={10}
      height="80px"
      ofl="hidden">
      <LinearGradient
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={['#FFA14A', '#fff']}>
        <CusT weight="bold" size={30}>
          {month}
        </CusT>
      </LinearGradient>
    </CustView>
  );
};
export const AllData = () => {
  return (
    <>
      <Topbar title="All Data" />
      {/* from here th year data starts */}
      <CustView>
        <ScrollView
          style={{
            marginTop: 20,
            paddingBottom: 10,
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
          horizontal>
          <YearScroll />
          <YearScroll />
          <YearScroll />
          <YearScroll />
        </ScrollView>
        {/* from here month boxes starts */}

        <CustView jus="space-around" fdr="row" fwr="wrap">
          {/* all twelve month names pass with month prop to MonthNames component  */}
          <MonthNames month="jan" />
          <MonthNames month="feb" />
          <MonthNames month="mar" />
          <MonthNames month="apr" />
          <MonthNames month="may" />
          <MonthNames month="jun" />
          <MonthNames month="jul" />
          <MonthNames month="aug" />
          <MonthNames month="sep" />
          <MonthNames month="oct" />
          <MonthNames month="nov" />
          <MonthNames month="dec" />
        </CustView>
      </CustView>
    </>
  );
};
