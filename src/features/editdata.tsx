import LinearGradient from 'react-native-linear-gradient';
import CusT from '../components/custom.text';
import {CustView} from '../components/devider';
import {TextInput} from 'react-native';
import React from 'react';
import {Topbar} from '../components/topbar';
export const EditData = () => {
  return (
    <>
      <Topbar title="Edit Data" />
      <CustView height="80%" jus="center" ali="center" width="100%">
        <CustView ofl="hidden" borR={20} height="50%" width="80%">
          <LinearGradient
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            colors={['#93FFF8', '#8B757509']}>
            {/* this handles title and Remove/absent data */}
            <CustView
              width="100%"
              fdr="row"
              ali="space-between"
              jus="space-around">
              {/* edit data */}
              <CustView
                height="40px"
                jus="center"
                ali="center"
                width="150px"
                borR={15}
                // marT={60}
                bcC="green">
                <CusT weight="bold" textAlign="center" size={20} color="#fff">
                  Edit Data
                </CusT>
              </CustView>
              {/* this is remove button */}
              <CustView
                height="40px"
                width="40px"
                borR={50}
                bcC="red"
                touchable
                // tofl
                tblC="green"
                jus="center">
                <CusT color="#fff" weight="bold" marT={-12} size={50}>
                  -
                </CusT>
              </CustView>
            </CustView>

            <CustView
              fdr="row"
              height="120px"
              borR={15}
              ofl="hidden"
              width="100%">
              <CustView width="50%">
                <CusT width="90%" marL={20} marB={5} weight="bold" size={20}>
                  Start
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
            </CustView>
            <CustView marB={20} borR={15} ofl="hidden" width="100%">
              <CusT width="90%" marL={20} marB={5} weight="bold" size={20}>
                Pass Hours
              </CusT>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'grey',
                  fontSize: 20,
                  width: '95%',
                  paddingLeft: 20,
                  borderRadius: 10,
                }}
                placeholder="hello there"
              />
            </CustView>
            <CustView
              height="40px"
              jus="center"
              ali="center"
              width="150px"
              borR={15}
              touchable
              // marT={60}
              bcC="blue">
              <CusT
                letterSpacing={4}
                weight="bold"
                textAlign="center"
                size={20}
                color="#fff">
                SUBMIT
              </CusT>
            </CustView>
          </LinearGradient>
        </CustView>
      </CustView>
    </>
  );
};
