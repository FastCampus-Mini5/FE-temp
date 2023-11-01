import { css } from 'styled-components'

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
export const StatusCommon = css<{ status: string }>`
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