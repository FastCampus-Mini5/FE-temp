import styled from 'styled-components'
import { convertStatusToText } from 'components/index'
import { StatusBox, CancelBox, mainTexts } from 'src/index'

type Item = {
  id: number
  dutyDate: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
}

export const DutyContainer = ({
  dutyDataList,
  extractDate,
  deleteButton,
  datalist
}) => {
  return (
    <>
      <DutyBoard>
        <BoxText>{mainTexts.applyDutyTexts}</BoxText>
        <DutyListBox>
          {datalist(dutyDataList).map((el: Item) => (
            <DutyList key={el.id}>
              <h2>📌 {extractDate(el.dutyDate)}</h2>
              <StatusBox status={el.status}>
                {convertStatusToText(el.status)}
              </StatusBox>
              <CancelBox
                onClick={() => deleteButton('당직', el.id)}
                status={el.status}>
                {mainTexts.dutyCancel}
              </CancelBox>
            </DutyList>
          ))}
        </DutyListBox>
      </DutyBoard>
    </>
  )
}
const DutyBoard = styled.div`
  width: 518px;
  height: 266px;
  border-radius: 10px;
  background-color: #fff;
  padding-bottom: 50px;
  box-shadow: #50515985 1px 2px 7px 1px;
`

const BoxText = styled.div`
  width: 450px;
  padding-bottom: 10px;
  position: relative;
  left: 30px;
  top: 20px;
  color: ${props => props.theme.colors.listTitle};
  font-size: 15px;
  font-weight: 700;
  display: flex;
  gap: 250px;
`
const DutyListBox = styled.div`
  width: 453px;
  height: 200px;
  position: relative;
  top: 30px;
  margin: auto;
  overflow-y: auto;
  max-height: 200px;
`

const DutyList = styled.div`
  width: 100%;
  height: 30px;
  margin: auto;
  display: flex;
  margin-top: 20px;

  h2 {
    width: 250px;
    padding: 7px;
    padding-bottom: 2%;
  }
`
