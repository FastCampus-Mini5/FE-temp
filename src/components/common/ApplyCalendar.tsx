import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export const ApplyCalendar = ({
  handleModalClick,
  eventContent,
  handleDatesSet,
  viewDrow,
  calendarRef
}) => {
  return (
    <>
      <CalendarContainer>
        <CalendarBox>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={info => handleModalClick(info)}
            eventContent={eventContent}
            datesSet={handleDatesSet}
            ref={calendarRef}
            timeZone="Asia/Seoul"
            events={viewDrow as unknown as EventInit[]}
            dayMaxEvents={true}
            locale={'ko'}
          />
        </CalendarBox>
      </CalendarContainer>
    </>
  )
}

const CalendarContainer = styled.div`
  width: 86%;
  padding-bottom: 40px;
  background-color: #fff;
  position: absolute;
  box-shadow: #50515985 1px 2px 7px 1px;
  border-radius: 10px;
`
const CalendarBox = styled.div`
  width: 1100px;
  position: relative;
  margin: 0 auto;
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
    color: #374984;
    max-width: 30%;
    left: 40%;
    top: 20px;
  }

  .fc-event-title fc-sticky {
    padding: 2px;
  }

  .fc-h-event {
    border: none;
    background-color: #fff;
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
    color: #374984;
    margin-right: 10px;
  }

  .fc-col-header-cell-cushion {
    color: #374984;
    width: 90%;
    height: 55px;
    font-size: 18px;
    padding: 10px;
    font-weight: bold;
  }

  /* 요일 행 */
  .fc .fc-scrollgrid-section table {
    height: 11px;
  }

  table .fc-scrollgrid-sync-table {
    width: 538px;
    height: 700px;
  }

  /* border값 초기화 */
  .fc-theme-standard th,
  .fc-theme-standard td {
    border: none;
  }

  .fc .fc-daygrid-day-top {
    position: relative;
    right: 90px;
    top: 10px;
  }

  .fc .fc-daygrid-day-frame {
    height: 120px;
  }

  .fc-event-time {
    display: none;
  }
`
