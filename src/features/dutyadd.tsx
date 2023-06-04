import CusT from '../components/custom.text';
import {CustView} from '../components/devider';
import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {Topbar} from '../components/topbar';
import {windowWidth} from '../components/utilitis';
import {DutyTime} from '../components/dutytime';
import {MainContext} from '../services/main.context';
export const DutyAdd = () => {
  // import dimension from react native
  const {userData} = useContext(MainContext);

  return (
    <>
      <Topbar title="Add duty" />
      <CustView height="100%" bcC="#D9D9D9">
        <ScrollView>
          <CustView marB={userData.length * 20} jus="center" ali="center">
            {userData.map((x, i) => {
              return <DutyTime key={i} id={x.userId} />;
            })}
          </CustView>
        </ScrollView>
      </CustView>
    </>
  );
};
