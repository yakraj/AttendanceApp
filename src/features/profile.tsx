import CusT from '../components/custom.text';
import React from 'react';
import {ImageBackground, ScrollView} from 'react-native';
import {Topbar} from '../components/topbar';
import {CustView, MyImage} from '../components/devider';
import {useNavigation} from '@react-navigation/native';

const OtherUser = () => {
  return (
    <ImageBackground
      style={{width: 200, height: 200, justifyContent: 'space-around'}}
      source={require('../../assects/otheruser.png')}>
      <CustView padT={10}>
        <MyImage
          style={{height: 70, width: 70}}
          source={require('../../assects/avatar.png')}
        />
        <CusT size={25} weight="bold" color="grey">
          Yakraj
        </CusT>
      </CustView>
      <CustView fdr="row" marT={-10} jus="space-around">
        <CustView>
          <CusT weight="bold" color="grey">
            SALARY
          </CusT>
          <CusT>8888</CusT>
        </CustView>
        <CustView>
          <CusT weight="bold" color="grey">
            PF
          </CusT>
          <CusT>8888</CusT>
        </CustView>
      </CustView>
    </ImageBackground>
  );
};

export const Profile = () => {
  const navigation = useNavigation();

  return (
    <>
      <ImageBackground
        resizeMode="contain"
        style={{width: '100%', height: 180}}
        source={require('../../assects/profilevector.png')}>
        <CusT
          weight="bold"
          size={70}
          position="absolute"
          top={10}
          left="55%"
          color="grey">
          246
        </CusT>
        <CustView marB={-10} position="absolute" Top="35" Left="35">
          <MyImage
            style={{height: 85, width: 85}}
            source={require('../../assects/avatar.png')}
          />
          <CusT size={30} weight="bold" color="grey">
            Yakraj
          </CusT>
        </CustView>
      </ImageBackground>
      <CustView>
        <ScrollView horizontal={true}>
          <OtherUser />
          <OtherUser />
          <OtherUser />
          <OtherUser />
        </ScrollView>
      </CustView>
      <CustView
        onpress={() => navigation.navigate('alldata')}
        touchable
        tblC="#82FFFF"
        fdr="row">
        <ImageBackground
          resizeMode="contain"
          style={{
            height: 90,
            width: '90%',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
          source={require('../../assects/topbarect.png')}>
          <CusT
            marL={30}
            size={30}
            letterSpacing={5}
            weight="bold"
            color="grey">
            ALL DATA
          </CusT>
        </ImageBackground>
        <MyImage
          style={{
            transform: 'rotate(180deg)',
            marginLeft: -30,
            height: 70,
            width: 70,
          }}
          source={require('../../assects/back.png')}
        />
      </CustView>
      <CustView touchable tblC="#82FFFF" fdr="row">
        <ImageBackground
          resizeMode="contain"
          style={{
            height: 90,
            width: '90%',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
          source={require('../../assects/topbarect.png')}>
          <CusT
            marL={30}
            size={30}
            letterSpacing={5}
            weight="bold"
            color="grey">
            NEW PERSON
          </CusT>
        </ImageBackground>
        <MyImage
          style={{
            transform: 'rotate(180deg)',
            marginLeft: -30,
            height: 70,
            width: 70,
          }}
          source={require('../../assects/plusicon.png')}
        />
      </CustView>
    </>
  );
};
