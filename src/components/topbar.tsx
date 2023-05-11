import {CustView, MyImage} from './devider';
import React from 'react';
import CusT from './custom.text';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  title: string;
  isTable?: true | false;
  route?: object;
}

export const Topbar = ({title, isTable, route}: Props) => {
  const navigation = useNavigation();
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
          width={isTable ? '60%' : '80%'}
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
      </CustView>
    </>
  );
};
