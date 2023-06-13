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
    <CustView
      fdr="row"
      jus="space-between"
      width="100%"
      position="absolute"
      Bottom="0">
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
        touchable
        tofl={true}>
        <MyImage
          style={{height: 70, width: 70}}
          source={require('../../assects/table.png')}
        />
      </CustView>
      <CustView
        onpress={() => {
          navigation.navigate('profile');
        }}
        touchable
        tofl={true}>
        <MyImage
          style={{height: 70, width: 70}}
          source={require('../../assects/account.png')}
        />
      </CustView>
    </CustView>
  );
};
