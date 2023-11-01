import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { AllDataList } from './index'
import { DeleteAnnualList, DeleteDutyList } from 'api/index'
import { useCallback, useEffect, useState } from 'react'
import { MyAnnualList, MyDutyList } from 'api/index'
import { IoReload } from 'react-icons/io5'
import { ExCelbox } from '../Button/ExcelButton'
import { AuualContainer } from 'components/index'
import { DutyContainer } from './duty/dutyContainer'
import { mainTexts, commonTexts } from 'constants/index'

export const Home = () => {
  const [CalDate, setCalDate] = useState<number>(2023)
  const [annualDataList, setAnnualDataList] = useState([])
  const [dutyDataList, setDutyDataList] = useState([])

  const navigate = useNavigate()

  const onChangeClick = () => {
    navigate('/application')
  }

  const searchData = useCallback(() => {
    MyAnnualList(CalDate.toString())
      .then(data => {
        const returnDatalist = data.data.response
        setAnnualDataList(returnDatalist)
        return MyDutyList(CalDate.toString())
      })
      .then(data => {
        const returnDatalist = data.data.response
        setDutyDataList(returnDatalist)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [CalDate])

  useEffect(() => {
    searchData()
  }, [CalDate])

  const extractDate = dateString => {
    if (dateString) {
      const date = dateString.split('T')[0]
      return date
    }
    return ''
  }

  const deleteButton = useCallback(
    async (type: string, id: string) => {
      if (!window.confirm(`${type}를 취소 하시겠습니까?`)) {
        alert(mainTexts.cancelText)
        return
      }

      try {
        let deleteFunction
        if (type === 'commonTexts.annualText') {
          deleteFunction = DeleteAnnualList
        } else {
          deleteFunction = DeleteDutyList
        }

        const response = await deleteFunction(id)
        if (response.status === 200) {
          alert(`${type}가 취소되었습니다.`)
          searchData()
        } else {
          alert(mainTexts.failCancelText)
        }
      } catch (error) {
        console.error(error)
        alert(mainTexts.areadyApply)
      }
    },
    [searchData]
  )

  const datalist = useCallback(datalist => {
    const filterViewData = datalist.filter(item => {
      return item.status !== 'CANCELLED'
    })
    return filterViewData
  }, [])

  const onClickLoad = () => {
    window.location.reload()
  }

  return (
    <HomeContainer>
      <Boards>
        <AuualContainer
          deleteButton={deleteButton}
          datalist={datalist}
          annualDataList={annualDataList}
          extractDate={extractDate}
        />

        <DutyContainer
          deleteButton={deleteButton}
          dutyDataList={dutyDataList}
          extractDate={extractDate}
          datalist={datalist}
        />
      </Boards>
      <CenterBarBox>
        <ApplyBox>
          <HomeApply onClick={onChangeClick}>
            {mainTexts.applyAnnualDuty}
          </HomeApply>
          <IoReload
            onClick={onClickLoad}
            style={{
              fontSize: '28px',
              color: '#1c3879d9',
              cursor: 'pointer',
              marginLeft: '16px',
              marginTop: '5px',
              position: 'absolute'
            }}
          />
        </ApplyBox>
        <CenterBoxInner>
          <ExCelbox />
          <BarBox>
            <ScheduleBarone>
              <p>{commonTexts.annualText}</p>
            </ScheduleBarone>
            <ScheduleBartwo>
              <p>{commonTexts.dutyText}</p>
            </ScheduleBartwo>
          </BarBox>
        </CenterBoxInner>
      </CenterBarBox>
      <CalendarBoard>
        <AllDataList />
      </CalendarBoard>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  width: 100%;
  height: 1100px;
  top: 20px;
  position: relative;
  margin: auto;
  font-family: 'LINESeedKR-Bd';
`
const Boards = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 50px;
  justify-content: space-between;
`

const CenterBarBox = styled.div`
  position: relative;
  top: 30px;
  display: flex;
  justify-content: space-between;
`
const ApplyBox = styled.div`
  width: 250px;
  position: relative;
  margin-top: 13px;
`
const HomeApply = styled.button`
  width: 150px;
  background-color: #1c3879d9;
  color: #fff;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  height: 40px;
  font-weight: bold;
  cursor: pointer;
`

const CenterBoxInner = styled.div`
  width: 380px;
  height: 50px;
  position: relative;
`

const BarBox = styled.div`
  width: 140px;
  margin-left: 200px;
  margin-top: 12px;
`
const ScheduleBarone = styled.div`
  width: 100px;
  height: 15px;
  border-radius: 30px;
  background-color: #4a42e4d4;
  position: relative;

  p {
    width: 30px;
    margin-left: 110px;
  }
`
const ScheduleBartwo = styled(ScheduleBarone)`
  background-color: #8696fe;
  margin-top: 10px;
`

const CalendarBoard = styled.div`
  width: 1200px;
  position: relative;
  display: flex;
  justify-content: center;
  top: 40px;
  right: 70px;
  border-radius: 10px;
  padding-bottom: 900px;
`
