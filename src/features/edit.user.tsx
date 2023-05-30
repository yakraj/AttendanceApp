import React, {useContext, useState} from 'react';
import {Topbar} from '../components/topbar';
import {TextInput, ScrollView, Alert} from 'react-native';
import {CustView, NMorph} from '../components/devider';
import CusT from '../components/custom.text';
import LinearGradient from 'react-native-linear-gradient';
import {MainContext} from '../services/main.context';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

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

export const EditUser = () => {
  const {CreateUser} = useContext(MainContext);
  const [Name, onName] = useState<string>('');
  const [SalP, onSalP] = useState<string>('');
  const [Exch, onExch] = useState<string>('');
  const [Pf, onPf] = useState<string>('');
  const [Esic, onEsic] = useState<string>('');
  const [Company, onCompany] = useState<string>('');

  const navigation = useNavigation();
  const router = useRoute();
  const {user} = router.params;
  const {userData, UpdateUser} = useContext(MainContext);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        let SelectedUser = userData.find(x => x.userId === user);
        onName(SelectedUser.name);
        onSalP(SelectedUser.salph.toString());
        onExch(SelectedUser.exCharge.toString());
        onPf(SelectedUser.pf.toString());
        onEsic(SelectedUser.esic.toString());
        onCompany(SelectedUser.company);
      }
    }, [userData]),
  );

  return (
    <>
      <Topbar title="Update User Data" />
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
                  PF%
                </CusT>
                <TextInput
                  value={Pf}
                  keyboardType="numeric"
                  onChangeText={text => onPf(text)}
                  style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    fontSize: 20,
                    width: '90%',
                    paddingLeft: 20,
                    borderRadius: 10,
                  }}
                  placeholder="PF % "
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
              UpdateUser(Name, Company, SalP, Pf, Esic, Exch, user);
              Alert.alert('Updated', 'Successfully Updated user!', [
                {text: 'OK', onPress: () => navigation.goBack()},
              ]);
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
