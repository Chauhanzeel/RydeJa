import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {FontStyle, Variables, Images} from '../../Theme';
import {useTranslation} from 'react-i18next';
import {goBack, navigate} from '../../navigators/RootNavigation';

import ProfilePhotoSvg from '../../assets/Images/ProfilePhoto.svg';
import ContactSvg from '../../assets/Images/Contact.svg';
import LegalSvg from '../../assets/Images/Legal.svg';
import WalletSvg from '../../assets/Images/WalletYellow.svg';
import TaxInfoSvg from '../../assets/Images/TaxInfo.svg';
import TransactionSvg from '../../assets/Images/TransactionHistory.svg';
import RydeWorksSvg from '../../assets/Images/RydeWorks.svg';

import DashedLine from 'react-native-dashed-line';

interface AccountProps {
  onClick: (val: number) => void;
}

const HostMode: React.FC<AccountProps> = ({onClick}) => {
  const {t} = useTranslation();

  const CardView = () => {
    return (
      <View style={styles.cardView}>
        <View style={styles.cardRowView}>
          <View style={{width: '83%', flexDirection: 'row'}}>
            <View style={{width: '20%'}}>
              <Image source={Images.userImg2} style={styles.userImageView} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Text style={[FontStyle.urbanistBold, styles.nameTxt]}>
                Bill Smith
              </Text>
              <TouchableOpacity onPress={() => navigate('UserProfile')}>
                <Text style={[FontStyle.urbanistSemiBold, styles.editTxt]}>
                  {t('labelConst.viewEditProfile')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => navigate('MyWallet')}>
            <Text style={[FontStyle.urbanistSemiBold, styles.walletTxt]}>
              My wallet
            </Text>
            <WalletSvg height={28} width={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.hostView}>
          <TouchableOpacity
            style={[styles.btnView, {height: 45, width: '100%'}]}
            onPress={() => {}}>
            <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
              Switch to host mode
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '93%', alignSelf: 'center', marginVertical: 25}}>
          <DashedLine dashLength={5} dashColor={Variables.Colors.borderGrey} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ScrollView style={{height: '100%'}}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 50,
          }}>
          <CardView />
          <View style={{marginTop: Variables.Measures.fontSize}}>
            <TouchableOpacity style={styles.accountView} onPress={() => {}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ProfilePhotoSvg width={25} height={25} />
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.descTxt,
                    {marginLeft: 20},
                  ]}>
                  {t('labelConst.accountTxt')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountView} onPress={() => {}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TransactionSvg width={25} height={25} />
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.descTxt,
                    {marginLeft: 20},
                  ]}>
                  Transaction history
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountView} onPress={() => {}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TaxInfoSvg width={25} height={22} />
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.descTxt,
                    {marginLeft: 20},
                  ]}>
                  Tax information
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountView}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RydeWorksSvg width={27} height={30} />
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.descTxt,
                    {marginLeft: 20},
                  ]}>
                  How Ryde works
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountView}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ContactSvg width={22} height={25} />
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.descTxt,
                    {marginLeft: 20},
                  ]}>
                  {t('labelConst.contactSupport')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountView}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <LegalSvg width={23} height={25} />
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.descTxt,
                    {marginLeft: 20},
                  ]}>
                  {t('labelConst.Legal')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.lineCenterView}>
            <View style={styles.lineView} />
          </View>
          <View style={{width: '85%', alignSelf: 'center'}}>
            <Text style={[FontStyle.urbanistMedium, styles.descTxt]}>
              {t('labelConst.logout')}
            </Text>
            <Text style={[FontStyle.urbanistSemiBold, styles.versionTxt]}>
              Version 00.00.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  hostView: {
    width: '93%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  walletTxt: {
    fontSize: 12,
    color: Variables.Colors.white,
    marginRight: 5,
  },
  nameTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.6,
  },
  editTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: Variables.Measures.fontSize / 2,
  },
  cardView: {
    backgroundColor: Variables.Colors.carGrey,
    width: '94%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 15,
    paddingVertical: 10,
  },
  cardRowView: {
    flexDirection: 'row',
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  userImageView: {
    height: 50,
    width: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  hostTxt: {
    marginVertical: 10,
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.6,
  },
  descTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    lineHeight: 20,
  },
  btnView: {
    backgroundColor: Variables.Colors.darkYellow,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: Variables.Colors.darkBlack,
    fontSize: Variables.Measures.fontSize / 1.4,
  },
  accountView: {
    width: '87%',
    alignSelf: 'center',
    marginTop: Variables.Measures.unit * 2.5,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  lineCenterView: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Variables.Measures.fontSize * 2.5,
  },
  lineView: {
    height: 1,
    backgroundColor: Variables.Colors.borderGrey,
    width: '100%',
  },
  versionTxt: {
    color: Variables.Colors.carsBorderGrey,
    marginTop: 20,
    fontSize: Variables.Measures.fontSize / 2,
  },
});
export default HostMode;
