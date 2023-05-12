import {BackgroundRect} from '../../App';
import CusT from '../components/custom.text';
import {CustView, MyImage} from '../components/devider';
import React, {useContext, useState} from 'react';
import {ImageBackground} from 'react-native';
import {Topbar} from '../components/topbar';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {MainContext} from '../services/main.context';
export const Retrieve = () => {
  const router = useRoute();
  const {data, month, year} = router.params;

  const {ActiveUser, tableData, userData, CurMOD} = useContext(MainContext);
  const [User, setUser] = React.useState<any>([]);
  const [TopObject, setTopObject] = React.useState<any>([]);
  const [UserWork, setUserWork] = React.useState<any>([]);

  useFocusEffect(
    React.useCallback(() => {
      // find all objects inside tableData array where userId is ActiveUser
      const find = data.filter(id => id.userId === ActiveUser);
      setUserWork(find);
      // find activeuse in userData array
      const User = userData.filter(id => id.userId === ActiveUser);
      setUser(User);
      const tempObj = {
        year: year,
        month: month,
        userId: ActiveUser,
      };
      setTopObject(tempObj);
    }, [data, userData, ActiveUser]),
  );
  return (
    <>
      <Topbar route={TopObject} title="FEB/2023" isTable />

      <CustView padT={20} bcC="#D9D9D9" height="100%">
        <CustView height="auto" width="100%">
          <MyImage source={require('../../assects/hometopd.png')} />
          <CustView position="absolute" Left="35" Top="-25">
            <MyImage source={require('../../assects/jobag.png')} />
          </CustView>
          <CustView position="absolute" Left="20" Top="85">
            <MyImage source={require('../../assects/notification.png')} />
          </CustView>
          <CustView position="absolute" Right="55" Top="15">
            <MyImage
              style={{width: 85, height: 85, marginBottom: -10}}
              source={require('../../assects/avatar.png')}
            />
            <CusT size={30} weight="bold" color="#fff">
              {User[0] && User[0].name.substring(0, 6)}
            </CusT>
          </CustView>
        </CustView>
        {/* four containers will be here */}
        <CustView
          fwr="wrap"
          width="100%"
          jus="space-around"
          display="flex"
          fdr="row">
          <BackgroundRect
            title="Hours"
            data={UserWork.reduce((acc, curr) => {
              return acc + curr.totalHours;
            }, 0)}
          />
          <BackgroundRect
            title="Days"
            data={UserWork.filter(day => day.totalHours > 4).length}
          />
          <BackgroundRect
            title="Pass"
            pass
            data={UserWork.reduce((acc, curr) => {
              return acc + curr.leaveTime;
            }, 0)}
          />
          <BackgroundRect
            unatt="10"
            title="UnAtt"
            data={UserWork.filter(day => day.totalHours === 0).length}
          />
        </CustView>
        {/* this is for salary */}
        <ImageBackground
          resizeMode="contain"
          style={{
            height: 250,
            width: '100%',
          }}
          source={require('../../assects/rect.png')}>
          <CustView
            ali="flex-start"
            padd={40}
            jus="space-around"
            height="100%"
            width="100%">
            <CusT size={30} weight="bold" color="grey">
              Salary
            </CusT>
            <CustView fdr="row" ali="flex-start">
              <MyImage source={require('../../assects/rs.png')} />
              <CusT size={60} weight="bold" color="grey">
                {User[0] &&
                  UserWork.reduce((acc, curr) => {
                    return acc + curr.totalHours;
                  }, 0) * User[0].salph}
              </CusT>
            </CustView>
            <CustView fdr="row">
              <CusT size={20} weight="bold" color="grey">
                PF:
              </CusT>
              <CusT size={15} color="grey">
                {'   Rs. '}
                {User[0] &&
                  (UserWork.filter(day => day.totalHours > 4).length *
                    8 *
                    User[0].salph *
                    User[0].pf) /
                    100}
              </CusT>
            </CustView>
          </CustView>
        </ImageBackground>
      </CustView>
    </>
  );
};
