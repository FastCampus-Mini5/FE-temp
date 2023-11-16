import styled, { css } from 'styled-components'

export const CalendarBoxStyle = css`
  width: 82%;
  height: 870px;
  background-color: #ffff;
  position: relative;
  top: 50px;
  margin: auto;
  border: 4px solid #FBB04C;
  border-radius: 10px;
` 
export const StatusBox = styled.div<{ status: string }>`
  width: 70px;
  border-radius: 5px;
  position: absolute;
  right: 110px;
  font-size: 12px;
  padding: 9px;
  padding-left: 13px;
  color: #ffff;

  background-color: ${({ status }) => {
    switch (status) {
      case 'PENDING':
        return '#7752FE' // 승인 대기 상태일 때 배경색
      case 'APPROVE':
        return '#F6635C' // 승인 완료 상태일 때 배경색
      case 'REJECT':
        return '#B31312' // 승인 거절 상태일 때 배경색
      default:
        return 'lightgray' // 기본 배경색
    }
  }};
`

export const CancelBox = styled(StatusBox)`
  right: 20px;
  background-color: #212a3e;
  padding-left: 25px;
  cursor: pointer;
`
export const CustomEvent = styled.div`
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
`

export const CalendarBox = styled.div`
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
`