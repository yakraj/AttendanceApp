import React, {useContext, useEffect} from 'react';
import {CustView, MyImage, NMorph} from './devider';
import {NavigationProp} from '@react-navigation/native';

import {ImageBackground, Text, View} from 'react-native';
import {Neomorph, Shadow} from 'react-native-neomorph-shadows';
import {useFocusEffect} from '@react-navigation/native';
import CusT from './custom.text';
import {MainContext} from '../services/main.context';
interface Props {
  navigation: NavigationProp<any, any>;
}

export const BottomBar = ({navigation}: Props) => {
  // find how many days are there in current month
  let getYear = new Date().getFullYear();
  let getMonth = new Date()
    .toLocaleString('default', {month: 'short'})
    .toLowerCase();
  const {ActiveUser, StoreIt} = useContext(MainContext);
  useFocusEffect(() => {
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    ).getDate();
  });

  return (
    <CustView width="100%" position="absolute" Bottom="0">
      <ImageBackground
        style={{
          height: 80,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        source={require('../../assects/navbar.png')}>
        <CustView
          onpress={() => {
            if (ActiveUser) {
              navigation.navigate('table', {
                year: getYear,
                month: getMonth,
                userId: ActiveUser,
              });
            }
          }}
          marL={20}
          tblC="blue"
          marT={5}
          touchable
          tofl={true}
          height="50px"
          width="50px">
          <MyImage
            style={{height: 60, width: 60}}
            source={require('../../assects/tablenav.png')}
          />
        </CustView>
        <CustView marT={-100} touchable tofl={true} height="50px" width="50px">
          <MyImage
            style={{height: 70, width: 70}}
            source={require('../../assects/homenav.png')}
          />
        </CustView>
        <CustView
          onpress={() => {
            navigation.navigate('profile');
          }}
          marR={25}
          marT={5}
          touchable
          tofl={true}
          height="50px"
          width="50px">
          <MyImage
            style={{height: 60, width: 60}}
            source={require('../../assects/profilenav.png')}
          />
        </CustView>
      </ImageBackground>
    </CustView>
  );
};
