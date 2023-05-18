import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import App from '../../App';
import {Profile} from '../features/profile';
import {AllData} from '../features/alldata';
import {AddPerson} from '../features/new.person';
import {Retrieve} from '../features/retrieve.data';
import {Table} from '../features/table';
import {MainProvider} from '../services/main.context';
import {EditData} from '../features/editdata';
import {EditUser} from '../features/edit.user';
import {DutyAdd} from '../features/dutyadd';
const Router = (): JSX.Element => {
  const Stack = createNativeStackNavigator();
  return (
    <MainProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={App} />
          <Stack.Screen name="editData" component={EditData} />
          <Stack.Screen name="table" component={Table} />
          <Stack.Screen name="retrieve" component={Retrieve} />
          <Stack.Screen name="addperson" component={AddPerson} />
          <Stack.Screen name="alldata" component={AllData} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="editUser" component={EditUser} />
          <Stack.Screen name="dutyadd" component={DutyAdd} />
        </Stack.Navigator>
      </NavigationContainer>
    </MainProvider>
  );
};

export default Router;
