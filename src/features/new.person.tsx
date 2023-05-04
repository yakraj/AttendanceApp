import React from 'react';
import {Topbar} from '../components/topbar';
import {TextInput, ScrollView} from 'react-native';
import {CustView, NMorph} from '../components/devider';
import CusT from '../components/custom.text';
import LinearGradient from 'react-native-linear-gradient';

type Texttypes = {
  title: string;
};
const TextArea = ({title}: Texttypes) => {
  return (
    <CustView height="120px" marB={20} borR={15} ofl="hidden" width="90%">
      <LinearGradient
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 25,
        }}
        colors={['#93FFF8', '#8B757509']}>
        <CusT marB={5} weight="bold" size={20}>
          {title}
        </CusT>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            fontSize: 20,
            width: '90%',
            paddingLeft: 20,
            borderRadius: 10,
          }}
          placeholder="hello there"
        />
      </LinearGradient>
    </CustView>
  );
};

export const AddPerson = () => {
  return (
    <>
      <Topbar title="Add A Person" />
      {/* this is full container  */}
      <ScrollView>
        <CustView marT={20}>
          <TextArea title="Name" />
          <TextArea title="Salary/Hour" />
          <TextArea title="Extra Charges" />
          {/* this is pf and esic section */}
          <CustView fdr="row" height="120px" borR={15} ofl="hidden" width="90%">
            <LinearGradient
              style={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 25,
                flexDirection: 'row',
              }}
              colors={['#93FFF8', '#8B757509']}>
              <CustView width="50%">
                <CusT width="90%" marL={20} marB={5} weight="bold" size={20}>
                  PF%
                </CusT>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    fontSize: 20,
                    width: '90%',
                    paddingLeft: 20,
                    borderRadius: 10,
                  }}
                  placeholder="hello there"
                />
              </CustView>
              <CustView width="50%">
                <CusT
                  width="90%"
                  marL={20}
                  textAlign="left"
                  marB={5}
                  weight="bold"
                  size={20}>
                  ESIC
                </CusT>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    fontSize: 20,
                    width: '90%',
                    paddingLeft: 20,
                    borderRadius: 10,
                  }}
                  placeholder="hello there"
                />
              </CustView>
            </LinearGradient>
          </CustView>

          {/* this is submit button */}
          <CustView
            height="50px"
            width="40%"
            borR={20}
            ofl="hidden"
            touchable
            bcC="red">
            <LinearGradient
              style={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              colors={['#93FFF8', '#8B7575']}>
              <CusT size={25} color="#fff" weight="bold" letterSpacing={3}>
                SUBMIT
              </CusT>
            </LinearGradient>
          </CustView>
        </CustView>
      </ScrollView>
    </>
  );
};
