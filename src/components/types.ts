export interface InputFieldProps {
  value?: string;
  autoCapitalize?: string | any;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  onSubmitEditing?: () => void;
  inputref?: string | any;
  inputReturnKeyType?: string | any;
  inputKeyboardType?: string | any;
  multiline?: boolean | any;
  placeholderIcon?: object;
  emailError?: number | undefined;
  passwordError?: number | undefined;
  nameError?: boolean | undefined;
  placeholderTextColor?: string;
  onEyeClicked?: () => void;
  passwordVisible?: boolean;
  placeholderSvg?: object | any;
  emptyField?: number | any;
  labelTxt?: string | any;
  maxLength?: number;
  textInputHeight?: number;
  textAlignVertical?: "center" | "auto" | "bottom" | "top";
  editable?: boolean;
}

export interface HeaderProps {
  leftIcon?: object;
  leftText?: string;
  centerText?: string;
  rightIcon?: object;
  rightText?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  rightSvg?: object | any;
  leftSvg?: object | any;
  backgroundColor?: object | any;
}

export interface BottomModalProps {
  openModal?: boolean;
  onModalClose?: () => void;
  headerTxt?: string;
  optionOneTxt?: string;
  optionTwoTxt?: string;
  onModalOptionPress?: (value: string) => void;
  cancelTxt?: string;
}

export interface OfferModalProps {
  openModal: boolean;
  headerTxt: string;
  setCloseModal?: () => void;
}

export interface SideBarProps {
  onClosePress: () => void;
  openDrawer: boolean;
  headingTxt: string;
  subHeadingText: string;
  firstDrawerText: string;
  secondDrawerText: string;
  firstImage: object;
  secondImage: object;
  onOptionPress: (value: string) => void;
}

export interface DropDownProps {
  dropDownData: object | any;
  value: string;
  zIndex?: number;
  bgcolor?: string;
  radius?: number;
  font?: string;
  fsize?: number;
  tcolor?: string;
  itemhight?: number | string;
  cTextSize?: number | string | any;
  cTextColor?: string;
  cTextFont?: string;
  onItemSelect?: (val: object) => void;
  dropDownSvg?: string | object | any;
  dropDownWidth: any;
  dropDownHeight?: any;
  top?: any;
}

export interface ButtonProps {
  btnTxt?: string;
  onBtnPress?: (value?: string) => void;
  width?: number | string;
  backgroundColor?: string;
  fontColor?: string;
  borderColor?: string;
  borderWidth?: number;
  isLoading?: boolean;
  disablebtn?: boolean;
  style?: any;
}

export interface RadioProps {
  onBtnPress?: (value?: string) => void;
  backgroundColor?: string;
  isCheck?: boolean;
  disablebtn?: boolean;
}

export interface BottomTabProps {
  iconFirstImg?: object | string | any;
  iconSecondImg?: object | string | any;
  iconThirdImg?: object | string | any;
  iconForthImg?: object | string | any;
  iconFifthImg?: object | string | any;
  iconSixthImg?: object | string | any;
  firstTabText?: string;
  secondTabText?: string;
  thirdTabText?: string;
  forthTabText?: string;
  fifthTabText?: string;
  sixthTabText?: string;
  firstTabColor?: string;
  secondTabColor?: string;
  thirdTabColor?: string;
  forthTabColor?: string;
  fifthTabColor?: string;
  sixthTabColor?: string;
  onTabPress: (value: string) => void;
}

export interface AddressDeatilsProps {
  openModal?: boolean;
  closeModal?: (val: boolean) => void;
}

export interface ProfileInputProps {
  value?: string | number | any;
  autoCapitalize?: string | any;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  onSubmitEditing?: () => void;
  inputref?: string | any;
  inputReturnKeyType?: string | any;
  inputKeyboardType?: string | any;
  multiline?: boolean | any;
  placeholderIcon?: object;
  emailError?: number | undefined;
  passwordError?: number | undefined;
  placeholderTextColor?: string;
  onEyeClicked?: () => void;
  passwordVisible?: boolean;
  onClicked?: () => void;
  placeholderSvg?: object | any;
  editable?: boolean;
  isClickable?: boolean;
  isEmailClickable?: boolean;
  marginTop?: number | string;
}
