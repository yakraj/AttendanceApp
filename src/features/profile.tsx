import CusT from '../components/custom.text';
import React, {useContext, useState} from 'react';
import {ImageBackground, ScrollView, Alert} from 'react-native';
import {Topbar} from '../components/topbar';
import {CustView, MyImage, NMorph} from '../components/devider';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {MainContext, currMonth, currYear} from '../services/main.context';

type daataa = {
  name: string;
  salary: number;
  pf: number;
  userId: string;
  salph: number;
  esic: number;
  exCharge: number;
};

const OtherUser = ({
  name,
  salary,
  pf,
  userId,
  salph,
  esic,
  exCharge,
}: daataa) => {
  const navigation = useNavigation();
  const [UserWork, setUserWork] = useState<any>([]);
  const {
    tableData,
    onTableData,
    ChangeUser,
    ActiveUser,
    onUserData,
    userData,
    setActiveUser,
  } = useContext(MainContext);

  useFocusEffect(
    React.useCallback(() => {
      // find all objects inside tableData array where userId is ActiveUser
      const FindYear = tableData.find(x => (x.year = currYear));
      const FindMonth = FindYear.months[currMonth];
      const find = FindMonth.filter(id => id.userId === userId);
      setUserWork(find);
    }, [tableData, ActiveUser, userData]),
  );

  return (
    <CustView
      LongPress={() => {
        const NewData = userData.filter(x => x.userId !== userId);
        const filteredArray = tableData.map(obj => ({
          ...obj,
          months: Object.fromEntries(
            Object.entries(obj.months).map(([month, data]) => [
              month,
              data.filter(item => item.userId !== userId),
            ]),
          ),
        }));

        Alert.alert(
          'Alert!',
          'What would you like to do with this?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Edit',
              onPress: () => {
                navigation.navigate('editUser', {user: userId});
              },
            },
            {
              text: 'Delete',
              onPress: () => {
                Alert.alert(
                  'Confirmation',
                  "Are you sure to delete this user's data?",
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        onUserData(NewData);
                        onTableData(filteredArray);
                        // Add your logic here
                        setActiveUser(userData[0].userId);
                      },
                    },
                  ],
                );
                // Code to execute when the user confirms
              },
            },
          ],
          {cancelable: false},
        );
      }}
      touchable
      onpress={() => ChangeUser(userId)}>
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
              }, 0) *
                salph -
                pf -
                esic -
                exCharge}
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
    </CustView>
  );
};

export const Profile = () => {
  const {tableData, userData, ActiveUser, CurMOD} = useContext(MainContext);
  const navigation = useNavigation();

  const [User, setUser] = React.useState<any>([]);
  const [RemUser, setRemUser] = React.useState<any>([]);
  const [UserWork, setUserWork] = React.useState<any>([]);
  useFocusEffect(
    React.useCallback(() => {
      // find all objects inside tableData array where userId is ActiveUser
      const find = CurMOD.filter(id => id.userId === ActiveUser);
      setUserWork(find);
      // find activeuse in userData array
      const User = userData.filter(id => id.userId === ActiveUser);
      setUser(User);
      setRemUser(userData.filter(x => x.userId !== ActiveUser));
    }, [CurMOD, userData, ActiveUser]),
  );

  return (
    <>
      <ImageBackground
        resizeMode="contain"
        style={{width: '100%', height: 180}}
        source={require('../../assects/profilevector.png')}>
        <CustView
          touchable
          tofl
          onpress={() => navigation.navigate('editUser', {user: ActiveUser})}
          position="absolute"
          Top="20"
          Right="10">
          <NMorph TC="pink" borR={50} height={60} width={60}>
            <MyImage
              resizeMode="contain"
              style={{width: 50}}
              source={require('../../assects/setting.png')}
            />
          </NMorph>
        </CustView>

        <CustView marB={-10} position="absolute" Top="35" Left="35">
          <MyImage
            style={{height: 85, width: 85}}
            source={require('../../assects/avatar.png')}
          />
          <CusT size={30} weight="bold" color="grey">
            {User[0] && User[0].name.substring(0, 7)}
          </CusT>
        </CustView>
      </ImageBackground>
      <CustView>
        <CustView fdr="row" ali="flex-start" width="90%">
          <CusT size={20} weight="bold" color="grey">
            Company
          </CusT>
          <CusT size={20} color="grey">
            : {User[0] && User[0].company}
          </CusT>
        </CustView>
        <CustView fdr="row" ali="flex-start" width="90%">
          <CusT size={20} weight="bold" color="grey">
            Salary Per Hour
          </CusT>
          <CusT size={20} color="grey">
            : Rs. {User[0] && User[0].salph}
          </CusT>
        </CustView>
        <CustView fdr="row" ali="flex-start" width="90%">
          <CusT size={20} weight="bold" color="grey">
            PF cutting
          </CusT>
          <CusT size={20} color="grey">
            : {User[0] && User[0].pf}%
          </CusT>
        </CustView>
        <CustView fdr="row" ali="flex-start" width="90%">
          <CusT size={20} weight="bold" color="grey">
            ESIC
          </CusT>
          <CusT size={20} color="grey">
            :Rs. {User[0] && User[0].esic}
          </CusT>
        </CustView>
        <CustView fdr="row" ali="flex-start" width="90%">
          <CusT size={20} weight="bold" color="grey">
            Extra Charges
          </CusT>
          <CusT size={20} color="grey">
            :Rs. {User[0] && User[0].exCharge}
          </CusT>
        </CustView>
      </CustView>
      <CustView>
        <ScrollView horizontal={true}>
          {RemUser.map((x, i) => {
            return (
              <OtherUser
                userId={x.userId}
                name={x.name}
                salph={x.salph}
                esic={x.esic}
                exCharge={x.exCharge}
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
