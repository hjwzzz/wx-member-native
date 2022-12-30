export const enum CALENDAR_TYPE {

  /**
   * 阳历
   */
  SOLAR ='S',

  /**
   * 农历
   */
  LUNAR ='L'
}

export interface CalendarPickItem {
  label: string
  value: number
}

export type CalendarMonthPickItem = CalendarPickItem & {

  /**
   * 是否闰月
   */
  isLeap?: boolean
}

export interface CalendarConfig {
  limit: {
    year: {
      start: number
      end: number
    }
    month: {
      start: number
      end?: number
    }
    day: {
      start: number
      end?: number
    }
  }
}

export type CalendarPickConfig = Partial<CalendarConfig>


export interface CalendarCurrentValue {
  year: number,
  month: number,
  day: number,
}
