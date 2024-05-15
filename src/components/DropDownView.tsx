import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {Layout, Variables} from '../Theme';
import {DropDownProps} from './types';

const DropDownView: React.FC<DropDownProps> = ({
  dropDownData,
  value,
  bgcolor,
  font,
  fsize,
  tcolor,
  itemhight,
  cTextSize,
  cTextColor,
  cTextFont,
  onItemSelect,
  dropDownSvg,
  dropDownWidth,
  top,
  zIndex,
  dropDownHeight,
}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const renderItem = (item: {label: string}) => {
    return (
      <TouchableOpacity
        style={[Layout.fullWidth, styles.outerView]}
        onPress={() => {
          onItemSelect(item), setVisible(!visible), setSelected(item.label);
        }}>
        <View style={[styles.btnView]}>
          <Text
            style={{
              fontSize: cTextSize,
              fontFamily: cTextFont,
              color: cTextColor,
            }}>
            {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.inputContainer,
        {
          backgroundColor: bgcolor,
          position: 'absolute',
          top: top,
          zIndex: zIndex,
        },
      ]}>
      <TouchableOpacity onPress={() => setVisible(!visible)} style={Layout.row}>
        <View style={[styles.inputView, {height: itemhight}]}>
          <View style={styles.containerView}>
            <Text
              style={{
                fontSize: fsize,
                fontFamily: font,
                color: tcolor,
              }}>
              {selected ? selected : value}
            </Text>
          </View>
        </View>
        <View
          style={{
            transform: [{rotate: visible ? '180deg' : '0deg'}],
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {dropDownSvg}
        </View>
      </TouchableOpacity>
      {visible && (
        <FlatList
          nestedScrollEnabled
          data={dropDownData}
          renderItem={({item}) => renderItem(item)}
          style={[
            styles.itemStyles,
            {
              width: dropDownWidth,
              height: dropDownHeight,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: Variables.Measures.width / 1.2,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  containerView: {
    width: '79%',
    justifyContent: 'center',
  },
  btnView: {
    height: Variables.FontSize.large,
    justifyContent: 'center',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 18,
  },
  inputContainer: {
    width: '90%',
    borderRadius: 12,
    alignSelf: 'center',
  },
  outerView: {
    borderTopColor: Variables.Colors.greyDots,
    width: '90%',
    alignSelf: 'center',
    // padding: 5,
  },
  itemStyles: {
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 10,
    borderTopColor: Variables.Colors.inputTxtColor,
    borderTopWidth: 0.5,
  },
});

export default DropDownView;
