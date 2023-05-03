import {BackgroundRect} from '../../App';
import CusT from '../components/custom.text';
import {CustView, MyImage} from '../components/devider';
import React from 'react';
import {ImageBackground} from 'react-native';
import {Topbar} from '../components/topbar';
export const Retrieve = () => {
  return (
    <>
      <Topbar title="FEB/2023" tableData />
      <CustView padT={20} bcC="#D9D9D9" height="100%">
        <CustView height="auto" width="100%">
          <MyImage source={require('../../assects/retrieve.png')} />
          <CustView position="absolute" Right="45" Top="-25">
            <MyImage source={require('../../assects/jobag.png')} />
          </CustView>
          <CustView position="absolute" Left="70" Top="5">
            <MyImage
              style={{width: 85, height: 85, marginBottom: -10}}
              source={require('../../assects/avatar.png')}
            />
            <CusT size={30} weight="bold" color="#fff">
              Yakraj
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
          <BackgroundRect title="Hours" data="246" />
          <BackgroundRect title="Days" data="20" />
          <BackgroundRect title="Pass" data="4" />
          <BackgroundRect unatt="10" title="UnAtt" data="5" />
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
                24,000
              </CusT>
            </CustView>
            <CustView fdr="row">
              <CusT size={20} weight="bold" color="grey">
                PF:
              </CusT>
              <CusT size={15} color="grey">
                {'   Rs. '}
                2500
              </CusT>
            </CustView>
          </CustView>
        </ImageBackground>
      </CustView>
    </>
  );
};
