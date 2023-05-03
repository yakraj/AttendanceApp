import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import App from '../../App';
import {Profile} from '../features/profile';
import {AllData} from '../features/alldata';
import {AddPerson} from '../features/new.person';
import {Retrieve} from '../features/retrieve.data';
const Router = (): JSX.Element => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="retrieve" component={Retrieve} />
        <Stack.Screen name="addperson" component={AddPerson} />
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="alldata" component={AllData} />
        <Stack.Screen name="profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
