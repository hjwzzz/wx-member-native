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
  isLeap?: boolean
}
