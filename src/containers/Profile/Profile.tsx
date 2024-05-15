import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FontStyle, Variables, Images} from '../../Theme';
import {useTranslation} from 'react-i18next';

import {goBack, navigate} from '../../navigators/RootNavigation';

import Header from '../../components/Header';

import DiscountHeader from '../../assets/Images/DiscountHeader.svg';
import PenSvg from '../../assets/Images/ModalIcons/pen.svg';
import RightArrow from '../../assets/Images/RightArrow.svg';

import AddressSvg from '../../assets/Images/Profile/Address.svg';
import NotificationSvg from '../../assets/Images/Profile/Notification.svg';
import PaymentSvg from '../../assets/Images/Profile/Payment.svg';
import SecuritySvg from '../../assets/Images/Profile/Security.svg';
import EditProfileSvg from '../../assets/Images/Profile/EditProfile.svg';
import LanguageSvg from '../../assets/Images/Profile/Language.svg';
import DarkModeSvg from '../../assets/Images/Profile/DarkMode.svg';
import PrivacyPolicySvg from '../../assets/Images/Profile/PrivacyPolicy.svg';
import HelpCenterSvg from '../../assets/Images/Profile/HelpCenter.svg';
import InviteFriendsSvg from '../../assets/Images/Profile/InviteFriends.svg';
import LogoutSvg from '../../assets/Images/Profile/Logout.svg';

import ToggleSwitch from 'toggle-switch-react-native';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const [isOnYellowToggleSwitch, setIsOnYellowToggleSwitch] = useState(true);

  const onToggle = (isOn: boolean) => {
    setIsOnYellowToggleSwitch(isOn);
  };
  const [showModal, setShowModal] = useState(false);

  const {t} = useTranslation();

  return (
    <View style={styles.safeAreaStyle}>
      <Header
        centerText={t('labelConst.profile')}
        rightSvg={<DiscountHeader height={28} width={28} />}
        onRightPress={() => {}}
      />
      <ScrollView>
        <View style={styles.contentCenter}>
          <TouchableOpacity
            style={{
              marginTop: Variables.Measures.fontSize,
            }}>
            <Image source={Images.userImg2} style={styles.placeholderImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageOrangeView}>
            <PenSvg height={12} width={12} />
          </TouchableOpacity>
        </View>
        <View style={styles.userView}>
          <Text style={[styles.nameTxt, FontStyle.urbanistBold]}>
            Andrew Ainsley
          </Text>
          <Text style={[styles.numTxt, FontStyle.urbanistSemiBold]}>
            +1 111 467 378 399
          </Text>
          <View style={styles.lineCenterView}>
            <View style={styles.lineView} />
          </View>
        </View>
        <View
          style={{
            width: '93%',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={styles.rowOuterView}
            onPress={() => navigate('EditProfile')}>
            <View style={styles.leftIconView}>
              <EditProfileSvg />
            </View>
            <View style={{width: '80%'}}>
              <Text style={[FontStyle.urbanistSemiBold, styles.editProfileTxt]}>
                {t('labelConst.editProfile')}
              </Text>
            </View>
            <RightArrow height={15} width={15} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowOuterView}
            onPress={() => navigate('Address')}>
            <View style={styles.leftIconView}>
              <AddressSvg />
            </View>
            <View style={{width: '80%'}}>
              <Text style={[FontStyle.urbanistSemiBold, styles.editProfileTxt]}>
                {t('labelConst.address')}
              </Text>
            </View>
            <RightArrow height={15} width={15} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowOuterView}
            onPress={() => navigate('Notification')}>
            <View style={styles.leftIconView}>
              <NotificationSvg />
            </View>
            <View style={{width: '80%'}}>
              <Text style={[FontStyle.urbanistSemiBold, styles.editProfileTxt]}>
                {t('labelConst.notification')}
              </Text>
            </View>
            <RightArrow height={15} width={15} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowOuterView}
            onPress={() => navigate('Payment')}>
            <View style={styles.leftIconView}>
              <PaymentSvg height={20} width={20} />
            </View>
            <View style={{width: '80%'}}>
              <Text style={[FontStyle.urbanistSemiBold, styles.editProfileTxt]}>
                {t('labelConst.payment')}
              </Text>
            </View>
            <RightArrow height={15} width={15} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowOuterView}
            onPress={() => navigate('Security')}>
            <View style={styles.leftIconView}>
              <SecuritySvg />
            </View>
            <View style={{width: '80%'}}>
              <Text style={[FontStyle.urbanistSemiBold, styles.editProfileTxt]}>
                {t('labelConst.security')}
              </Text>
            </View>
            <RightArrow height={15} width={15} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowOuterView}
            onPress={() => navigate('Language')}>
            <View style={styles.leftIconView}>
              <LanguageSvg />
            </View>
            <View style={{width: '49%'}}>
              <Text style={[FontStyle.urbanistSemiBold, styles.editProfileTxt]}>
                {t('labelConst.language')}
              </Text>
            </View>
            <Text style={[styles.languageTxt, FontStyle.urbanistSemiBold]}>
              English (US)
            </Text>
            <RightArrow height={15} width={15} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowOuterView}>
            <View style={styles.leftIconView}>
              <DarkModeSvg />
            </View>
            <View style={{width: '73%'}}>
              <Text style={[FontStyle.urbanistSemiBold, styles.editProfileTxt]}>
                {t('labelConst.darkMode')}
              </Text>
            </View>
            <ToggleSwitch
              onColor={Variables.Colors.yellow}
              offColor={Variables.Colors.borderGrey}
              isOn={isOnYellowToggleSwitch}
              onToggle={value => {
                setIsOnYellowToggleSwitch(isOnYellowToggleSwitch);
                onToggle(value);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowOuterView}
            onPress={() => navigate('PrivacyPolicy')}>
            <View style={styles.leftIconView}>
              <PrivacyPolicySvg />
            </View>
            <View style={{width: '80%'}}>
              <Text style={[FontStyle.urbanistSemiBold, styles.editProfileTxt]}>
                {t('labelConst.privacyPolicy')}
              </Text>
            </View>
            <RightArrow height={15} width={15} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowOuterView}
            onPress={() => navigate('HelpCenter')}>
            <View style={styles.leftIconView}>
              <HelpCenterSvg />
            </View>
            <View style={{width: '80%'}}>
              <Text style={[FontStyle.urbanistSemiBold, styles.editProfileTxt]}>
                {t('labelConst.helpCenter')}
              </Text>
            </View>
            <RightArrow height={15} width={15} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowOuterView}
            onPress={() => navigate('InviteFriends')}>
            <View style={styles.leftIconView}>
              <InviteFriendsSvg />
            </View>
            <View style={{width: '80%'}}>
              <Text style={[FontStyle.urbanistSemiBold, styles.editProfileTxt]}>
                {t('labelConst.inviteFriends')}
              </Text>
            </View>
            <RightArrow height={15} width={15} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowOuterView}
            onPress={() => setShowModal(!showModal)}>
            <View style={styles.leftIconView}>
              <LogoutSvg />
            </View>
            <View style={{width: '80%'}}>
              <Text style={[FontStyle.urbanistSemiBold, styles.logOutTxt]}>
                {t('labelConst.logout')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderImage: {
    resizeMode: 'contain',
    height: Variables.Measures.fontSize * 5,
    width: Variables.Measures.width / 2,
  },
  imageOrangeView: {
    backgroundColor: Variables.Colors.yellow,
    height: 20,
    width: 20,
    position: 'absolute',
    bottom: 5,
    right: Variables.Measures.width / 2.6,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
  },
  numTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    marginTop: Variables.Measures.unit / 1.5,
  },
  lineCenterView: {
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Variables.Measures.fontSize,
  },
  lineView: {
    height: 1,
    backgroundColor: Variables.Colors.borderGrey,
    width: Variables.Measures.width / 1.1,
  },
  editProfileTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 18,
  },
  logOutTxt: {
    color: Variables.Colors.red,
    fontSize: 18,
  },
  rowOuterView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  leftIconView: {
    width: '13%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 5,
  },
  userView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Variables.Measures.fontSize / 1.5,
  },
  languageTxt: {
    marginRight: Variables.Measures.fontSize / 1.5,
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.2,
  },
  safeAreaStyle: {
    backgroundColor: Variables.Colors.blackBg,
    height: Variables.Measures.height - 100,
  },
});
export default Profile;
