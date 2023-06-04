import CusT from '../components/custom.text';
import {CustView, NMorph} from '../components/devider';
import {ScrollView} from 'react-native';
import {Topbar} from '../components/topbar';
import React, {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {MainContext} from '../services/main.context';

// year data
const Yeardata = {
  data: Object,
  onMonths: Dispatch<SetStateAction<never[]>>,
  onactiveYear: Dispatch<SetStateAction<never[]>>,
};

const YearScroll = ({data, onMonths, onactiveYear}: Yeardata) => {
  return (
    <NMorph
      ofl="hidden"
      sadR={3}
      TC="skyblue"
      height={40}
      marL={10}
      marR={10}
      borR={30}
      width={80}>
      <CustView
        width="80px"
        touchable
        tofl
        onpress={() => {
          onMonths(data.months);
          onactiveYear(data.year);
        }}
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
            {data.year}
          </CusT>
        </LinearGradient>
      </CustView>
    </NMorph>
  );
};

type monthType = {
  month: string;
  data: any;
  activeYear: number;
};
const MonthNames = ({month, data, activeYear}: monthType) => {
  const navigation = useNavigation();

  return (
    <NMorph
      ofl="hidden"
      sadR={3}
      TC="skyblue"
      height={80}
      marB={10}
      marT={10}
      borR={10}
      width={80}>
      <CustView
        touchable
        onpress={() =>
          navigation.navigate('retrieve', {
            year: activeYear,
            month: month,
            data: data,
          })
        }
        width="100%"
        height="100%">
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
    </NMorph>
  );
};
export const AllData = () => {
  const [Months, onMonths] = useState([]);
  const [activeYear, onactiveYear] = useState([]);
  const {tableData, ActiveUser} = useContext(MainContext);

  useEffect(() => {
    onMonths(tableData[0].months);
    onactiveYear(tableData[0].year);
  }, []);

  return (
    <>
      <Topbar title="All Data" />
      {/* from here th year data starts */}
      <CustView>
        <ScrollView
          style={{
            height: 60,
            marginTop: 20,
            paddingBottom: 10,
            borderBottomColor: 'grey',
            width: '100%',
            borderBottomWidth: 1,
          }}
          horizontal>
          {tableData.map((x, i) => {
            return (
              <YearScroll
                key={i}
                onactiveYear={onactiveYear}
                onMonths={onMonths}
                data={x}
              />
            );
          })}
        </ScrollView>
        {/* from here month boxes starts */}

        <CustView width="100%" jus="space-around" fdr="row" fwr="wrap">
          {/* all twelve month names pass with month prop to MonthNames component  */}
          {Object.keys(Months).map((x, i) => {
            return Months[x].find(x => x.userId === ActiveUser) ? (
              <MonthNames
                activeYear={activeYear}
                key={i}
                data={Months[x]}
                Months={Months}
                month={x}
              />
            ) : null;
          })}
        </CustView>
      </CustView>
    </>
  );
};
