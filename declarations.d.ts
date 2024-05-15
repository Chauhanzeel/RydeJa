declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'rn-content-loader' {
  import React, {PropsWithChildren} from 'react';

  interface ContentLoaderProps {
    primaryColor?: string;
    secondaryColor?: string;
    width?: string | number;
    height?: string | number;
    x1?: string;
    y1?: string;
    x2?: string;
    y2?: string;
    viewBox?: string;
  }

  const ContentLoader: React.FC<PropsWithChildren<ContentLoaderProps>>;
  export default ContentLoader;
}

declare module 'react-native-otp-textinput' {
  import React, {PropsWithChildren} from 'react';

  interface OtpInputProps {
    defaultValue?: string;
    handleTextChange: (value: string) => void;
    inputCount?: number;
    tintColor?: string;
    offTintColor?: string;
    inputCellLength?: number;
    containerStyle?: object;
    textInputStyle?: object;
    autoFocus?: boolean;
  }

  const OtpInput: React.FC<PropsWithChildren<OtpInputProps>>;
  export default OtpInput;
}

declare module 'react-native-smooth-pincode-input' {
  import {ReactElement, Component} from 'react';
  import {StyleProp, ViewStyle, TextStyle, TextInputProps} from 'react-native';
  type SmoothPinCodeInputProps = {
    value?: string;
    codeLength?: number;
    cellSize?: number;
    cellSpacing?: number;
    placeholder?: string | ReactElement;
    mask?: string | ReactElement;
    maskDelay?: number;
    password?: boolean;
    autoFocus?: boolean;
    restrictToNumbers?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    cellStyle?: StyleProp<ViewStyle>;
    cellStyleFocused?: StyleProp<ViewStyle>;
    cellStyleFilled?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    textStyleFocused?: StyleProp<TextStyle>;
    animated?: boolean;
    animationFocused?: string | any;
    onFulfill?: (value: string) => void;
    onChangeText?: TextInputProps['onChangeText'];
    onBackspace?: () => void;
    onTextChange?: TextInputProps['onChangeText'];
    testID?: any;
    onFocus?: TextInputProps['onFocus'];
    onBlur?: TextInputProps['onBlur'];
    keyboardType?: string;
    editable?: boolean;
    inputProps?: TextInputProps;
  };

  type SmoothInputSate = {
    maskDelay: boolean;
    focused: boolean;
  };

  export default class SmoothPinCodeInput extends Component<
    SmoothPinCodeInputProps,
    SmoothInputSate
  > {}
}

declare module 'react-native-range-datepicker' {
  import React, {PropsWithChildren} from 'react';

  interface DateRangePickerProps {
    initialMonth?: string;
    dayHeadings?: any;
    availableDates?: any;
    maxMonth?: number;
    buttonColor?: string;
    buttonText?: string;
    dayHeaderDividerColor?: string;
    closeButtonText?: string;
    chosenDateTextColor?: string;
    flatListProps?: object;
    dayHeaderStyle?: object;
    dayHeaderContainerStyle?: object;
    buttonContainerStyle?: object;
    monthProps?: object;
    startDate?: string;
    untilDate?: string;
    minDate?: string;
    maxDate?: string;
    showReset?: boolean;
    showClose?: boolean;
    dayContainerOffset?: number;
    showConfirmButton?: boolean;
    showSelectedRange?: boolean;
    showsVerticalScrollIndicator?: boolean;
    ignoreMinDate?: boolean;
    isHistorical?: boolean;
    onClose?: (value: string) => void;
    onSelect?: (value: string) => void;
    onConfirm?: (value: string) => void;
    placeHolderStart?: string;
    placeHolderUntil?: string;
    selectedBackgroundColor?: string;
    resetButtonText?: string;
    selectedTextColor?: string;
    dayBackgroundColor?: string;
    dayTextColor?: string;
    pointBackgroundColor?: string;
    pointTextColor?: string;
    todayColor?: string;
    infoText?: string;
    infoStyle?: object;
    showSelectionInfo?: boolean;
    showButton?: boolean;
    infoContainerStyle?: object;
  }

  const DatepickerRange: React.FC<PropsWithChildren<DateRangePickerProps>>;
  export default DatepickerRange;
}
