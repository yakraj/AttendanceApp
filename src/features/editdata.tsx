import LinearGradient from 'react-native-linear-gradient';
import CusT from '../components/custom.text';
import {CustView} from '../components/devider';
import {TextInput} from 'react';
import React from 'react';
export const EditData = () => {
  return (
    <>
      <CustView height="100%" width="100%">
        <CustView height="40%" width="80%">
          {/* this handles title and Remove/absent data */}
          <CustView>
            <CusT>Yakraj</CusT>
          </CustView>
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
                <CusT marB={5} weight="bold" size={20}>
                  From
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
                <CusT textAlign="left" marB={5} weight="bold" size={20}>
                  Over
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
                Pass Hours
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
        </CustView>
      </CustView>
    </>
  );
};
