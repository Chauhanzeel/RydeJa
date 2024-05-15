'use strict';
import React, {memo} from 'react';
import {View, Text} from 'react-native';
import DayRow from './DayRow';
import {dayJsMod} from '../helper';

const areEqual = (prevProps, nextProps) => {
  if (nextProps.minDate != prevProps.minDate) return false;

  if (nextProps.maxDate != prevProps.maxDate) return false;

  if (nextProps.availableDates != prevProps.availableDates) return false;

  if (nextProps.startDate != prevProps.startDate) return false;

  if (nextProps.untilDate != prevProps.untilDate) return false;

  return true;
};

const Month = memo(props => {
  const {month, dayProps} = props;

  const getDayStack = month => {
    let res = [];
    let currMonth = dayJsMod(month).month(); //get this month
    let currDate = dayJsMod(month).startOf('month'); //get first day in this month

    let dayColumn = [];
    let dayRow = [];
    let dayObject = {};
    let {availableDates, minDate, maxDate} = props;

    do {
      dayColumn = [];
      for (let i = 0; i < 7; i++) {
        dayObject = {
          type: null,
          date: null,
        };
        if (i == currDate.day() && currDate.month() == currMonth) {
          if (
            minDate &&
            minDate.format('YYYYMMDD') &&
            currDate.format('YYYYMMDD') < minDate.format('YYYYMMDD')
          ) {
            dayObject.type = 'disabled';
          }
          if (
            maxDate &&
            maxDate.format('YYYYMMDD') &&
            currDate.format('YYYYMMDD') > maxDate.format('YYYYMMDD')
          ) {
            dayObject.type = 'disabled';
          }
          if (
            availableDates &&
            availableDates.indexOf(currDate.format('YYYYMMDD')) == -1
          ) {
            dayObject.type = 'blockout';
          }

          dayObject.date = currDate.clone().format('YYYYMMDD');
          dayColumn.push(dayObject);
          currDate = currDate.add(1, 'day');
        } else dayColumn.push(dayObject);
      }

      dayRow.push(dayColumn);
    } while (currDate.month() == currMonth);

    return dayRow;
  };

  const dayStack = getDayStack(dayJsMod(month, 'YYYYMM'));

  return (
    <View>
      <Text style={{fontSize: 20, padding: 20}}>
        {dayJsMod(month, 'YYYYMM').format('MMMM YYYY')}
      </Text>
      <View>
        {dayStack.map((days, i) => {
          return (
            <DayRow
              days={days}
              dayProps={dayProps}
              key={i}
              onSelectDate={props.onSelectDate}
            />
          );
        })}
      </View>
    </View>
  );
}, areEqual);

export default Month;
