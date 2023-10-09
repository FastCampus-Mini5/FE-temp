import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useRef } from 'react'
import { allAnnualList, allDutyList } from 'api/index'
import { getTitleWithStatus } from '../custom/index'
import { useCalendarData } from '@/hooks/useCalendarData'

export const AllDataList = ({ CalendarDate }) => {
  const calendarRef = useRef<FullCalendar | null>(null)
  const [CalDate, setCalDate] = useState<number>(2023)

  const { viewDrow } = useCalendarData(
    allAnnualList(CalDate.toString()),
    allDutyList(CalDate.toString()),
    getTitleWithStatus,
    CalDate
  )

  const eventContent = ({ event }) => {
    return (
      <CustomEvent title={event._def.extendedProps.type}>
        {event.title}
      </CustomEvent>
    )
  }

  const handleDatesSet = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()
      const date = calendarApi.getDate()
      const year = date.getFullYear()
      if (year !== CalDate) {
        setCalDate(year)
        CalendarDate(year)
      }
    }
  }

  return (
    <CalendarContainer>
      <CalendarBox>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventContent={eventContent}
          datesSet={handleDatesSet}
          ref={calendarRef}
          timeZone="Asia/Seoul"
          events={viewDrow as unknown as EventInit[]}
          locale={'ko'}
        />
      </CalendarBox>
    </CalendarContainer>
  )
}

const CalendarContainer = styled.div`
  width: 1060px;
  padding-bottom: 5%;
  background-color: #ffffff;
  position: absolute;
  box-shadow: #50515985 1px 2px 7px 1px;
  border-radius: 10px;
`

const CalendarBox = styled.div`
  width: 95%;
  position: relative;
  margin: 0 auto;
  top: 20px;
  left: 10px;
  border-radius: 10px;
  font-family: 'LINESeedKR-Bd';

  .fc-theme-standard .fc-scrollgrid {
    width: 100%;
    border-radius: 10px;
    border: none;
  }

  .fc-header-toolbar {
    width: 100%;
    position: relative;
    border-radius: 10px 10px 0px 0px;
    padding-bottom: 10px;
  }

  .fc .fc-toolbar-title {
    position: absolute;
    margin: auto;
    color: #0815a6;
    max-width: 30%;
    left: 40%;
    top: 20px;
  }

  .fc-event-title fc-sticky {
    padding: 2px;
  }

  .fc-h-event {
    border: none;
    background-color: #c9aae6;
    margin-top: 2px;
    border-radius: 5px;
  }
  .fc-daygrid-day-events {
    top: 20px;
  }

  .fc .fc-button-primary {
    border: none;
    background-color: #1c3879;
    position: relative;
    top: 15px;
    margin-right: 18px;
  }

  .fc-button-group {
    position: absolute;
    border: 0;
    outline: 0;
    width: 5rem;
    left: 10%;
  }

  .fc .fc-daygrid-day-number {
    position: relative;
    right: 20px;
    font-size: 17px;
    font-weight: bold;
    color: #0815a6;
    margin-right: 10px;
  }

  /* 일요일 날짜 빨간색 */
  .fc-col-header-cell fc-day fc-day-sat {
    color: red;
  }

  /* 토요일 날짜 파란색 */
  .fc-col-header-cell fc-day fc-day-sat {
    color: blue;
  }

  .fc-col-header-cell-cushion {
    color: #0815a6;
    width: 90%;
    height: 50px;
    font-size: 18px;
    padding: 10px;
    font-weight: bold;
  }

  /* 요일 행 */
  .fc .fc-scrollgrid-section table {
    height: 15px;
  }

  table .fc-scrollgrid-sync-table {
    width: 538px;
    height: 700px;
  }

  /* border값 초기화 */
  .fc-theme-standard th,
  .fc-theme-standard td {
    border: 0px;
  }

  .fc .fc-daygrid-day-top {
    position: relative;
    right: 70px;
    top: 20px;
  }

  div > .fc-daygrid-day-frame.fc-scrollgrid-sync-inner {
    height: max-content;
    display: flex;
    position: relative;
    overflow: hidden;
  }

  .fc-event-time {
    display: none;
  }
`
const CustomEvent = styled.div`
  border: none;
  font-size: 12px;
  height: 20px;
  padding: 5px;
  margin-top: 2px;
  color: #ffff;
  border-radius: 5px;
  background-color: ${({ title }) =>
    title === 'ANNUAL' ? '#4a42e4d4' : '#8696FE'};
`
