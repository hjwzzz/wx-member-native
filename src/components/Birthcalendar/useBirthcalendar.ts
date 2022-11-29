import { readonly, reactive } from 'vue';
import { calendar as formatCalendar } from './calendar';
import { CalendarConfig, CalendarPickConfig, CalendarCurrentValue, CalendarMonthPickItem, CalendarPickItem } from './index.type';


export const useCalendar = (calendarConfig: CalendarPickConfig = {}) => {
  const date = new Date();

  const defaultConfig = readonly<CalendarConfig>({
    limit: {
      year: {
        start: 1900,
        end: date.getFullYear() + 1
      },
      month: { start: 1 },
      day: { start: 1 },

    }
  });

  const mergeConfig = (config: CalendarConfig = defaultConfig, calendarConfig: CalendarPickConfig ) => readonly({
    ...config,
    ...calendarConfig
  });

  const config = reactive(mergeConfig(defaultConfig, calendarConfig));

  const getConfig = () => config;

  const setConfig = (calendarConfig: CalendarPickConfig) => {
    mergeConfig(getConfig(), calendarConfig);
  };


  const initSolar = ({ year, month, day }: CalendarCurrentValue, calendarConfig: CalendarPickConfig = {}) => {

    setConfig(calendarConfig);

    const {
      limit: {
        year: {
          start: yearStart,
          end: yearEnd
        },
        month: { end: monthEnd = 12 },
        day: { end: dayEnd = formatCalendar.solarDays(year, month) },
      }
    } = getConfig();

    const yearArray = Array.from<unknown, CalendarPickItem>({ length: yearEnd - yearStart }, (_, yearLoopIndex) => ({
      label: `${yearStart + yearLoopIndex}年`,
      value: yearStart + yearLoopIndex
    }));

    const monthArray = Array.from<unknown, CalendarMonthPickItem>({ length: monthEnd }, (_, monthLoopIndex) => ({
      label: `${monthLoopIndex + 1}月`,
      value: monthLoopIndex + 1
    }));

    const dayArray = Array.from<unknown, CalendarPickItem>({ length: dayEnd }, (_, dayLoopIndex) => ({
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

  const initLunar = ({ year, month, day }: CalendarCurrentValue, calendarConfig: CalendarPickConfig = {}) => {

    const res = formatCalendar.solar2lunar(year, month, day);

    if (res === -1) {
      throw Error('有错误');
    }
    const leapMonthIndex = formatCalendar.leapMonth(year);


    setConfig(calendarConfig);

    const {
      limit: {
        year: {
          start: yearStart,
          end: yearEnd
        },
        month: { end: monthEnd = leapMonthIndex ? 13 : 12 },
        day: { end: dayEnd = leapMonthIndex === month ? formatCalendar.leapDays(year) : formatCalendar.monthDays(year, month) },
      }
    } = getConfig();

    const yearArray = Array.from<unknown, CalendarPickItem>({ length: yearEnd - yearStart }, (_, yearLoopIndex) => ({
      label: `${yearStart + yearLoopIndex}`,
      value: yearStart + yearLoopIndex
    }));


    const monthArray = Array.from<unknown, CalendarMonthPickItem>({ length: monthEnd }, (_, monthLoopIndex) => {

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


    const dayArray = Array.from<unknown, CalendarPickItem>({ length: dayEnd }, (_, dayLoopIndex) => ({
      label: `${formatCalendar.toChinaDay(dayLoopIndex + 1)}`,
      value: dayLoopIndex + 1
    }));

    const yearIndex = yearArray.findIndex(item => item.value === res.lYear);
    const monthIndex = res.isLeap ? res.lMonth : res.lMonth - 1;
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

  return {
    getConfig,
    setConfig,
    initSolar,
    initLunar
  };
};
