import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useRef } from 'react'

export const CalendarCommon = ({ viewDrow }) => {
  const [CalDate, setCalDate] = useState<number>(2023)
  const calendarRef = useRef<FullCalendar | null>(null)

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
      }
    }
  }

  return (
    <>
      <CalendarContainer>
        <CalendarBox>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            timeZone="Asia/Seoul"
            eventContent={eventContent}
            datesSet={handleDatesSet}
            ref={calendarRef}
            dayMaxEvents={true}
            events={viewDrow as unknown as EventInit[]}
            locale={'ko'}
          />
        </CalendarBox>
      </CalendarContainer>
    </>
  )
}

const CalendarContainer = styled.div`
  width: 100%;
  padding-bottom: 40px;
  background-color: #ffff;
  position: relative;
  margin: auto;
  top: 10px;
  /* border: 2px solid #696ea6; */
  box-shadow: #50515985 1px 2px 7px 1px;
  border-radius: 10px;
`

const CalendarBox = styled.div`
  width: 90%;
  position: relative;
  margin: 0 auto;
  height: 80%;
  top: 20px;
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
    margin-right: 15px;
  }

  .fc-col-header-cell-cushion {
    color: #0815a6;
    width: 90%;
    height: 50px;
    font-size: 18px;
    padding: 10px;
    font-weight: bold;
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
    right: 60px;
  }

  .fc-event-time {
    display: none;
  }

  .fc-event  {
    border: none;
  }
`
const CustomEvent = styled.div`
  border: none;
  font-size: 15px;
  overflow: hidden;
  width: 100%;
  height: 20px;
  padding: 4px;
  margin-top: 2px;
  margin: auto;
  border-radius: 3px;
  color: #ffff;
  border: none;
  background-color: ${({ title }) =>
    title === 'ANNUAL' ? '#190482' : '#7752FE'};
  //title === 'ANNUAL' ? '#13e6b5' : '#aae613'};
`
