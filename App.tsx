import {BottomBar} from './src/components/bottomBar';
import React, {useContext, useEffect} from 'react';
import {CustView, MyImage, NMorph} from './src/components/devider';
import {ImageBackground} from 'react-native';
import CusT from './src/components/custom.text';
import {MainContext} from './src/services/main.context';
import {useFocusEffect} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

// import NotificationManager from './src/components/notification.manage';
type CustBR = {
  title: string;
  data: string;
  unatt?: string;
  pass?: boolean;
};
export const BackgroundRect = ({title, data, unatt, pass}: CustBR) => {
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
            {pass && (
              <CusT size={10} color="red" textAlign="right" weight="bold">
                Hours
              </CusT>
            )}
          </CustView>
        </CustView>
      </ImageBackground>
    </>
  );
};

const configureNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'trial-notification-channel',
      channelName: 'Trial Notification Channel',
      channelDescription: 'A channel for trial notifications',
      importance: PushNotification.Importance.HIGH,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );
};

function App({navigation}): JSX.Element {
  const {ActiveUser, tableData, userData, CurMOD} = useContext(MainContext);
  const [User, setUser] = React.useState<any>([]);
  const [UserWork, setUserWork] = React.useState<any>([]);

  // this is trial based notification

  const sendTrialNotification = () => {
    PushNotification.localNotification({
      /* Android Only Properties */
      largeIconUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png', // URL of the large icon image
      bigPictureUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png', // URL of the big picture image
      color: 'blue', // Notification color
      vibrate: true, // Vibrate on notification
      vibration: 300, // Vibration duration
      priority: 'high', // Notification priority
      channelId: 'trial-notification-channel',
      /* iOS and Android properties */
      title: 'Custom Notification', // Notification title
      message: 'This is a custom notification with an image.', // Notification message
      playSound: true, // Play a sound on notification
      soundName: 'default', // Sound to play (default is the default notification sound)
    });
  };

  // these are for each 3 minutes

  const scheduleThreeMinuteNotification = () => {
    console.log('executed');
    PushNotification.localNotificationSchedule({
      channelId: 'trial-notification-channel',
      message: 'This is a trial notification every 3 minutes!',
      date: new Date(Date.now() + 3 * 60 * 1000),
      repeatType: 'time',
      repeatTime: 3 * 60 * 1000,
      allowWhileIdle: true,
      foreground: true,
    });
  };

  // this useEffect will manage the push notification with that
  useEffect(() => {
    configureNotificationChannel();

    // scheduleThreeMinuteNotification();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (!CurMOD) {
        return;
      }
      // find all objects inside tableData array where userId is ActiveUser
      const find = CurMOD.filter(id => id.userId === ActiveUser);
      setUserWork(find);
      // find activeuse in userData array
      const User = userData.filter(id => id.userId === ActiveUser);
      setUser(User);
    }, [CurMOD, userData, ActiveUser]),
  );

  return userData.length === 0 ? (
    <CustView
      jus="center"
      ali="center"
      height="100%"
      position="relative"
      width="100%">
      <MyImage
        resizeMode="contain"
        style={{height: '100%'}}
        source={require('./assects/nouser.png')}
      />

      <CusT position="absolute" top={600} size={20} color="red">
        No User added Please Add User By clicking profile icon
      </CusT>
      <BottomBar navigation={navigation} />
    </CustView>
  ) : (
    <CustView padT={20} bcC="#D9D9D9" height="100%">
      <CustView height="auto" width="100%">
        <MyImage source={require('./assects/hometopd.png')} />
        <CustView position="absolute" Left="35" Top="-25">
          <MyImage source={require('./assects/jobag.png')} />
        </CustView>
        <CustView
          touchable
          tofl
          onpress={() => navigation.navigate('dutyadd')}
          tblC="#000"
          position="absolute"
          Left="15"
          Top="78">
          <MyImage
            resizeMode="contain"
            style={{width: 40}}
            source={require('./assects/plusicon.png')}
          />
        </CustView>
        <CustView position="absolute" Right="55" Top="15">
          <MyImage
            style={{width: 85, height: 85, marginBottom: -10}}
            source={require('./assects/avatar.png')}
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
          <CusT size={10} weight="regular" color="grey">
            After Cutting all charges (pf,esic,charges)
          </CusT>
          <CustView fdr="row" ali="flex-start">
            <MyImage source={require('./assects/rs.png')} />
            <CusT size={60} weight="bold" color="grey">
              {User[0] &&
                (
                  UserWork.reduce((acc, curr) => {
                    return acc + curr.totalHours;
                  }, 0) *
                    User[0].salph -
                  (UserWork.filter(day => day.totalHours >= 4).length *
                    8 *
                    User[0].salph *
                    User[0].pf) /
                    100 -
                  User[0].esic -
                  User[0].exCharge
                )
                  .toString()
                  .substring(0, 7)}
            </CusT>
          </CustView>
          <CustView fdr="row">
            <CusT size={20} weight="bold" color="grey">
              PF:
            </CusT>
            <CusT size={15} color="grey">
              {'   Rs. '}
              {User[0] &&
                (UserWork.filter(day => day.totalHours >= 8).length *
                  8 *
                  User[0].salph *
                  User[0].pf) /
                  100}
            </CusT>
          </CustView>
        </CustView>
      </ImageBackground>
      <CustView
        padd={10}
        border="1px solid grey"
        touchable
        onpress={() => sendTrialNotification()}>
        <CusT>Notificate</CusT>
      </CustView>
      <BottomBar navigation={navigation} />
    </CustView>
  );
}

export default App;
