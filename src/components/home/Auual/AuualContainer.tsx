import styled from 'styled-components'
import { convertStatusToText } from 'components/custom/index'
import { remainState } from '@/store/atoms'
import { useRecoilValue } from 'recoil'
import { mainTexts } from '@/constants'

interface Item {
  id: string
  startDate: string
  endDate: string
  status: string
}

export const AuualContainer = ({
  deleteButton,
  datalist,
  annualDataList,
  extractDate
}) => {
  const remain = useRecoilValue(remainState)

  return (
    <>
      <AnnualBoard>
        <BoxText>
          <span>{mainTexts.applyAnnualText}</span>
          <span>
            {mainTexts.remainText}:{remain} 개
          </span>
        </BoxText>

        <AuualListBox>
          {datalist(annualDataList).map((item: Item) => (
            <AuualList key={item.id}>
              <h2>
                📌 {extractDate(item.startDate)} ~ {extractDate(item.endDate)}
              </h2>
              <StatusBox>{convertStatusToText(item.status)}</StatusBox>
              <CancelBox onClick={() => deleteButton('연차', item.id)}>
                {mainTexts.annualCancel}
              </CancelBox>
            </AuualList>
          ))}
        </AuualListBox>
      </AnnualBoard>
    </>
  )
}

const Board = styled.div`
  width: 518px;
  height: 266px;
  border-radius: 10px;
  background-color: #fff;
  padding-bottom: 50px;
  box-shadow: #50515985 1px 2px 7px 1px;
`

const AnnualBoard = styled(Board)``

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
const AuualListBox = styled.div`
  width: 453px;
  height: 200px;
  position: relative;
  top: 30px;
  margin: auto;
  overflow-y: auto;
  max-height: 200px;
`
const AuualList = styled.div`
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
const StatusBox = styled.div`
  width: 70px;
  border-radius: 5px;
  background-color: gray;
  position: absolute;
  right: 110px;
  font-size: 12px;
  padding: 8px;
  padding-left: 13px;
  color: #ffff;
`
const CancelBox = styled(StatusBox)`
  right: 20px;
  background-color: #212a3e;
  padding-left: 25px;
  cursor: pointer;
`
