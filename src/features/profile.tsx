import CusT from '../components/custom.text';
import React, {useContext, useState} from 'react';
import {ImageBackground, ScrollView} from 'react-native';
import {Topbar} from '../components/topbar';
import {CustView, MyImage} from '../components/devider';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {MainContext} from '../services/main.context';

type daataa = {
  name: string;
  salary: number;
  pf: number;
  userId: string;
  salph: number;
};

const OtherUser = ({name, salary, pf, userId, salph}: daataa) => {
  const [UserWork, setUserWork] = useState<any>([]);
  const {tableData} = useContext(MainContext);
  useFocusEffect(
    React.useCallback(() => {
      // find all objects inside tableData array where userId is ActiveUser
      const find = tableData.filter(id => id.userId === userId);
      setUserWork(find);
    }, [tableData]),
  );

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
          {name}
        </CusT>
      </CustView>
      <CustView fdr="row" marT={-10} jus="space-around">
        <CustView>
          <CusT weight="bold" color="grey">
            SALARY
          </CusT>
          <CusT>
            {UserWork.reduce((acc, curr) => {
              return acc + curr.totalHours;
            }, 0) * salph}
          </CusT>
        </CustView>
        <CustView>
          <CusT weight="bold" color="grey">
            PF
          </CusT>
          <CusT>
            {(UserWork.filter(day => day.totalHours > 4).length *
              8 *
              salph *
              pf) /
              100}
          </CusT>
        </CustView>
      </CustView>
    </ImageBackground>
  );
};

export const Profile = () => {
  const {tableData, userData, ActiveUser} = useContext(MainContext);
  const navigation = useNavigation();

  const [User, setUser] = React.useState<any>([]);
  const [RemUser, setRemUser] = React.useState<any>([]);
  const [UserWork, setUserWork] = React.useState<any>([]);

  useFocusEffect(
    React.useCallback(() => {
      // find all objects inside tableData array where userId is ActiveUser
      const find = tableData.filter(id => id.userId === ActiveUser);
      setUserWork(find);
      // find activeuse in userData array
      const User = userData.filter(id => id.userId === ActiveUser);
      setUser(User);

      setRemUser(userData.filter(x => x.userId !== ActiveUser));
    }, [tableData, userData]),
  );

  return (
    <>
      <ImageBackground
        resizeMode="contain"
        style={{width: '100%', height: 180}}
        source={require('../../assects/profilevector.png')}>
        <CustView Top={10} Right="100" position="absolute">
          <CusT
            weight="bold"
            size={50}
            // position="absolute"

            color="grey">
            {User[0] &&
              UserWork.reduce((acc, curr) => {
                return acc + curr.totalHours;
              }, 0)}
          </CusT>
          <CusT color="blue">Hours</CusT>
        </CustView>

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
          {RemUser.map((x, i) => {
            return (
              <OtherUser
                userId={x.userId}
                name={x.name}
                salph={x.salph}
                salary={454}
                pf={x.pf}
                key={i}
              />
            );
          })}
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
      <CustView
        touchable
        onpress={() => navigation.navigate('addperson')}
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
