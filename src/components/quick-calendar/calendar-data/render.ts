import { calendar as formatCalendar } from './calendar';
import { CalendarPickItem, CALENDAR_TYPE, CalendarMonthPickItem } from './calendar.type';


export const getLunar = (year: number, month: number, date: number) => formatCalendar.solar2lunar(year, month, date);

export const formatNum = (n: number) => {
  if (n < 10) {
    return `0${n}`;
  }
  return `${n}`;
};

export const submit = (
  lunar = CALENDAR_TYPE.SOLAR,
  year: number, month: number, day: number
) => {
  if(lunar === CALENDAR_TYPE.SOLAR) {
    const toValues = formatCalendar.solar2lunar(year, month, day);

    if (toValues === -1) {
      return {};
    }

    return {
      text: `${toValues.lYear}年${toValues.lMonth}月${toValues.lDay}日`,
      year: toValues.lYear,
      month: toValues.lMonth,
      day: toValues.lDay,
    };
  }

  // if(lunar === CALENDAR_TYPE.LUNAR) {
  //   let isLeap = false;
  //   if(typeof month === 'string') {
  //     isLeap = month.indexOf('闰') !== -1;
  //     if(isLeap) month = parseInt(month.substr(1));
  //   }

  //   const toValues = formatCalendar.lunar2solar(year, parseInt(month), day, isLeap);


  //   return {
  //     text: `${toValues.cYear}年${toValues.cMonth}月${toValues.cDay}日`,
  //     year: toValues.cYear,
  //     month: toValues.cMonth,
  //     day: toValues.cDay
  //   };
  // }
};

export const init = (
  calendarType: CALENDAR_TYPE,
  startDate: number,
  endDate: number,
  year: number,
  month: number,
  day: number,
) => {
  if (calendarType === CALENDAR_TYPE.SOLAR) {
    return calendarSolar(startDate, endDate, year, month, day);
  }
  if (calendarType === CALENDAR_TYPE.LUNAR) {
    return calendarLunar(startDate, endDate, year, month, day );
  }

};

export const calendarSolar = (
  startYear: number,
  endYear: number,
  year: number,
  month: number,
  day: number,
) => {
  const yearArray = Array.from<unknown, CalendarPickItem>({ length: endYear - startYear }, (_, yearLoopIndex) => ({
    label: `${startYear + yearLoopIndex}年`,
    value: startYear + yearLoopIndex
  }));

  const monthArray = Array.from<unknown, CalendarMonthPickItem>({ length: 12 }, (_, monthLoopIndex) => ({
    label: `${monthLoopIndex + 1}月`,
    value: monthLoopIndex + 1
  }));

  const dayArray = Array.from<unknown, CalendarPickItem>({ length: formatCalendar.solarDays(year, month) }, (_, dayLoopIndex) => ({
    label: `${dayLoopIndex + 1}日`,
    value: dayLoopIndex + 1
  }));

  const yearIndex = yearArray.findIndex(item => item.value === year);
  const monthIndex = monthArray.findIndex(item => item.value === month);
  const dayIndex = dayArray.findIndex(item => item.value === day);

  return {
    range: [yearArray, monthArray, dayArray],
    value: {
      year,
      month,
      day,
    },
    index: {
      year: yearIndex,
      month: monthIndex,
      day: dayIndex,
    }
  };
};

export const calendarLunar = (
  startYear: number,
  endYear: number,
  year: number,
  month: number,
  day: number,
) => {


  const res = formatCalendar.solar2lunar(year, month, day);

  if (res === -1) {
    throw Error('有错误');
  }

  const yearArray = Array.from<unknown, CalendarPickItem>({ length: endYear - startYear }, (_, yearLoopIndex) => ({
    label: `${startYear + yearLoopIndex}`,
    value: startYear + yearLoopIndex
  }));

  const leapMonthIndex = formatCalendar.leapMonth(year);

  const monthArray = Array.from<unknown, CalendarMonthPickItem>({ length: leapMonthIndex ? 13 : 12 }, (_, monthLoopIndex) => {

    const chinaMonthValue = monthLoopIndex + 1;
    // 如果没有闰月
    if (leapMonthIndex === 0) {
      return {
        label: `${formatCalendar.toChinaMonth(chinaMonthValue)}`,
        value: chinaMonthValue
      };
    }

    // 闰月在当前月之前，正常返回
    if (leapMonthIndex > monthLoopIndex) {
      return {
        label: `${formatCalendar.toChinaMonth(chinaMonthValue)}`,
        value: chinaMonthValue
      };
    }

    // 闰月就是当前月
    if (leapMonthIndex === monthLoopIndex) {
      return {
        label: `闰${formatCalendar.toChinaMonth(monthLoopIndex)}`,
        value: monthLoopIndex,
        isLeap: true
      };
    }

    return {
      label: `${formatCalendar.toChinaMonth(monthLoopIndex)}`,
      value: monthLoopIndex
    };
  });

  const daylength = leapMonthIndex === month ? formatCalendar.leapDays(year) : formatCalendar.monthDays(year, month);

  const dayArray = Array.from<unknown, CalendarPickItem>({ length: daylength }, (_, dayLoopIndex) => ({
    label: `${formatCalendar.toChinaDay(dayLoopIndex + 1)}`,
    value: dayLoopIndex + 1
  }));

  const yearIndex = yearArray.findIndex(item => item.value === res.lYear);
  const monthIndex = res.isLeap ? res.lMonth + 1 : res.lMonth;
  const dayIndex = dayArray.findIndex(item => item.value === res.lDay);

  return {

    range: [yearArray, monthArray, dayArray],
    value: {
      year,
      month,
      day
    },
    index: {
      year: yearIndex,
      month: monthIndex,
      day: dayIndex,
    }
  };
};
