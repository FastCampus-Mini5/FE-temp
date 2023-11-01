import { useState } from 'react'
import { allAnnualList, allDutyList } from 'api/index'
import { getTitleWithStatus } from '../custom/index'
import { useCalendarData } from '@/hooks/useCalendarData'
import { CalendarCommon } from 'components/common'

export const AllDataList = () => {
  const [CalDate, setCalDate] = useState<number>(2023)

  const { viewDrow } = useCalendarData(
    allAnnualList(CalDate.toString()),
    allDutyList(CalDate.toString()),
    getTitleWithStatus,
    CalDate
  )

  return (
    <>
      <CalendarCommon viewDrow={viewDrow} />
    </>
  )
}
