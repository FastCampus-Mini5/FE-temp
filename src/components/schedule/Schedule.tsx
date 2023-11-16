import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useRef } from 'react'
import { MyAnnualList, MyDutyList } from 'api/index'
import { getMyTitleWithStatus, CommonBarButton } from 'components/index'
import { useCalendarData, CustomEvent, CalendarBox } from 'src/index'

export const Schedule = () => {
  const [CalDate, setCalDate] = useState<number>(2023)
  const calendarRef = useRef<FullCalendar | null>(null)

  const { viewDrow } = useCalendarData(
    MyAnnualList(CalDate.toString()),
    MyDutyList(CalDate.toString()),
    getMyTitleWithStatus,
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
      }
    }
  }

  return (
    <Outermost>
      <Rectangle>
        <BarBox>
          <CommonBarButton />
        </BarBox>
        <CalendarContainer>
          <CalendarBox>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={viewDrow as unknown as EventInit[]}
              timeZone="Asia/Seoul"
              eventContent={eventContent}
              datesSet={handleDatesSet}
              ref={calendarRef}
              dayMaxEvents={true}
              locale={'ko'}
            />
          </CalendarBox>
        </CalendarContainer>
      </Rectangle>
    </Outermost>
  )
}

const Rectangle = styled.div`
  width: 1060px;
  height: 600px;
  border-radius: 10px;
  margin: 24px 0;
`
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
const BarBox = styled.div`
  width: 210px;
  position: relative;
  margin-left: 800px;
  margin-top: 12px;
  background-color: red;
`
const Outermost = styled.div`
  display: flex;
  flex-direction: column;
`
