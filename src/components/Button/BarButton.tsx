import { commonTexts } from 'constants/index'
import styled from 'styled-components'

export const CommonBarButton = () => {
  return (
    <>
      <ScheduleBarone>
        <p>{commonTexts.annualText}</p>
      </ScheduleBarone>
      <ScheduleBartwo>
        <p>{commonTexts.dutyText}</p>
      </ScheduleBartwo>
    </>
  )
}
const ScheduleBarone = styled.div`
  width: 100px;
  height: 15px;
  border-radius: 30px;
  background-color: #190482;
  position: relative;

  p {
    width: 50px;
    margin-left: 110px;
  }
`
const ScheduleBartwo = styled(ScheduleBarone)`
  background-color: #7752fe;
  margin-top: 10px;
`
