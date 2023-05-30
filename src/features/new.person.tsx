import React, {useContext, useState} from 'react';
import {Topbar} from '../components/topbar';
import {TextInput, ScrollView, Alert} from 'react-native';
import {CustView, NMorph} from '../components/devider';
import CusT from '../components/custom.text';
import LinearGradient from 'react-native-linear-gradient';
import {MainContext} from '../services/main.context';
import {useNavigation} from '@react-navigation/native';

type Texttypes = {
  title: string;
  val: () => void;
  placeholder: string;
  change?: () => void;
  Numeric?: boolean;
};
const TextArea = ({title, val, change, placeholder, Numeric}: Texttypes) => {
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
          value={val}
          keyboardType={Numeric ? 'numeric' : 'default'}
          onChangeText={text => change(text)}
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            fontSize: 20,
            width: '90%',
            paddingLeft: 20,
            borderRadius: 10,
          }}
          placeholder={placeholder}
        />
      </LinearGradient>
    </CustView>
  );
};

export const AddPerson = () => {
  const {CreateUser} = useContext(MainContext);
  const [Name, onName] = useState<string>('');
  const [SalP, onSalP] = useState<string>('');
  const [Exch, onExch] = useState<string>('');
  const [Pf, onPf] = useState<string>('12');
  const [Pfsel, onPfsel] = useState<string>('');
  const [Esic, onEsic] = useState<string>('');
  const [Company, onCompany] = useState<string>('');

  const navigation = useNavigation();
  return (
    <>
      <Topbar title="Add A Person" />
      {/* this is full container  */}
      <ScrollView>
        <CustView marT={20}>
          <TextArea
            placeholder="Person Name"
            val={Name}
            change={onName}
            title="Name"
          />
          <TextArea
            placeholder="Mahindra & Mahindra"
            val={Company}
            change={onCompany}
            title="Company Name"
          />
          <TextArea
            placeholder="1 Hour Salary"
            val={SalP}
            Numeric
            change={onSalP}
            title="Salary/Hour"
          />
          <TextArea
            placeholder="Extra Charges"
            val={Exch}
            Numeric
            change={onExch}
            title="Extra Charges"
          />
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
                  PF
                </CusT>
                <CustView
                  width="100%"
                  jus="space-around"
                  fdr="row"
                  height="40%">
                  <CustView
                    jus="center"
                    ali="center"
                    width="40%"
                    borR={10}
                    touchable
                    onpress={() => {
                      onPfsel('yes');
                    }}
                    padd={5}
                    height="90%"
                    border="1px solid grey"
                    bcC={Pfsel === 'yes' ? 'green' : ''}>
                    <CusT
                      color={Pfsel === 'yes' ? '#fff' : '#202020'}
                      weight="bold"
                      size={20}>
                      YES
                    </CusT>
                  </CustView>
                  <CustView
                    jus="center"
                    ali="center"
                    width="40%"
                    borR={10}
                    touchable
                    onpress={() => {
                      onPfsel('no');
                    }}
                    padd={5}
                    height="90%"
                    border="1px solid grey"
                    bcC={Pfsel === 'no' ? 'green' : ''}>
                    <CusT
                      color={Pfsel === 'no' ? '#fff' : '#202020'}
                      weight="bold"
                      size={20}>
                      NO
                    </CusT>
                  </CustView>
                </CustView>
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
                  value={Esic}
                  keyboardType="numeric"
                  onChangeText={text => onEsic(text)}
                  style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    fontSize: 20,
                    width: '90%',
                    paddingLeft: 20,
                    borderRadius: 10,
                  }}
                  placeholder="Esic Charge"
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
            onpress={() => {
              if (Name.length < 1 || Company.length < 1 || SalP.length < 1) {
                Alert.alert('Error', 'Please fill all the fields!', [
                  {text: 'OK', onPress: () => null, style: 'cancel'},
                ]);
                return;
              } else {
                CreateUser(Name, Company, SalP, Pf, Pfsel, Esic, Exch);
                Alert.alert('Created', 'Successfully Created new user!', [
                  {text: 'OK', onPress: () => navigation.goBack()},
                ]);
              }
            }}
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
