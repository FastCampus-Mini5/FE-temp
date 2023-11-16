import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useRef } from 'react'
import { CustomEvent, CalendarBox } from 'src/index'

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
  box-shadow: #50515985 1px 2px 7px 1px;
  border-radius: 10px;
`

