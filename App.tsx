import {BottomBar} from './src/components/bottomBar';
import React from 'react';
import {CustView, MyImage, NMorph} from './src/components/devider';
import {ImageBackground} from 'react-native';
import CusT from './src/components/custom.text';
type CustBR = {
  title: string;
  data: string;
  unatt?: string;
};
export const BackgroundRect = ({title, data, unatt}: CustBR) => {
  return (
    <>
      <ImageBackground
        resizeMode="contain"
        style={{
          height: 120,
          width: 180,
          overflow: 'hidden',
        }}
        source={require('./assects/rect.png')}>
        <CustView jus="center" height="100%" width="100%">
          <CusT size={30} weight="bold">
            {title}
          </CusT>
          <CustView fdr="row" ali="center">
            <CusT size={50} color="#2E4DED" weight="bold">
              {data}
            </CusT>
            {unatt && (
              <CusT size={10} color="red" textAlign="right" weight="bold">
                Days
              </CusT>
            )}
          </CustView>
        </CustView>
      </ImageBackground>
    </>
  );
};

function App({navigation}): JSX.Element {
  return (
    <CustView padT={20} bcC="#D9D9D9" height="100%">
      <CustView height="auto" width="100%">
        <MyImage source={require('./assects/hometopd.png')} />
        <CustView position="absolute" Left="35" Top="-25">
          <MyImage source={require('./assects/jobag.png')} />
        </CustView>
        <CustView position="absolute" Left="20" Top="85">
          <MyImage source={require('./assects/notification.png')} />
        </CustView>
        <CustView position="absolute" Right="55" Top="15">
          <MyImage
            style={{width: 85, height: 85, marginBottom: -10}}
            source={require('./assects/avatar.png')}
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
        source={require('./assects/rect.png')}>
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
            <MyImage source={require('./assects/rs.png')} />
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
      <BottomBar navigation={navigation} />
    </CustView>
  );
}

export default App;
