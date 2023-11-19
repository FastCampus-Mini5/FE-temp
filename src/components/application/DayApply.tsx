import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import { useEffect, useState, useRef } from 'react'
import { dayApplyTexts, CustomEvent } from 'src/index'
import { AnnualModal, DuttyModal, Topimagesbox } from './index'
import {
  getTitleWithStatus,
  ApplyCalendar,
  CommonBarButton
} from 'components/index'
import { allAnnualList, allDutyList, UserInfoList } from 'api/index'

interface DataItem {
  title: string
  start: Date
  end: Date
  type: 'ANNUAL' | 'Duty'
  username: string
  date: Date
}

export const Apply = () => {
  const calendarRef = useRef<FullCalendar | null>(null)
  const [selectedModal, setSelectedModal] = useState<
    'ANNUAL_MODAL' | 'DUTY_MODAL' | null
  >(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [CalDate, setCalDate] = useState<number>(2023)
  const [username, SetUserName] = useState('')
  const [data, setData] = useState<DataItem[]>([])
  const [selectedButton, setSelectedButton] = useState('')
  const [activeButton, setActiveButton] = useState('ANNUAL')
  const [viewDrow, setViewDrow] = useState([
    {
      email: '',
      title: '',
      start: '',
      end: '',
      username: '',
      status: ''
    }
  ])

  // 유저 정보 api
  useEffect(() => {
    searchInfoUser()
  }, [])

  const searchInfoUser = () => {
    UserInfoList().then(data => {
      const userData = data.data.response
      SetUserName(userData.username)
    })
  }

  const eventContent = ({ event }) => {
    return <CustomEvent title={selectedButton}>{event.title}</CustomEvent>
  }

  const handleButtonClick = (button: 'ANNUAL' | 'DUTY') => {
    setSelectedButton(button)
    setActiveButton(button)
  }

  const handleModalClick = (info: any) => {
    let dateSelect = new Date(info.date)
    if (dateSelect.getDay() === 0 || dateSelect.getDay() === 6) {
      alert('토요일 또는 일요일은 선택할 수 없습니다.')
      return false
    }

    dateSelect.setHours(9, 0, 0, 0)

    const dupuleData = data.filter((item: DataItem) => {

      if (item.type === 'ANNUAL') {
        const startDay = item.start
        const endDay = item.end
        startDay.setHours(9, 0, 0, 0)
        endDay.setHours(9, 0, 0, 0)
        if (
          dateSelect >= startDay &&
          dateSelect <= endDay &&
          item.username === username
        ) {
          return item
        }
      } else {
        const dutyDate = item.date
        dutyDate.setHours(9, 0, 0, 0)
        if (dateSelect === dutyDate && item.username === username) {
          return item
        }
      }
      return false
    })

    console.log(dupuleData)
    if (dupuleData.length > 0) {
      alert('이미 해당 날짜에 신청한 연차가 존재합니다.')
      return false
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0) //시간 분 초 초기화

    if (dateSelect < today) {
      alert('오늘 날짜 이전은 선택할 수 없습니다.')
      return false
    }
    viewDrow.find(item => {
      const start = new Date(item.start)
      const end = new Date(item.end)
      if (!start || !end) {
        return false
      }
      const inRange =
        dateSelect.getTime() >= start.getTime() &&
        dateSelect.getTime() <= end.getTime()
      return inRange
    })
    setSelectedModal(
      selectedButton === 'ANNUAL' ? 'ANNUAL_MODAL' : 'DUTY_MODAL'
    )
    setSelectedDate(dateSelect)
    return false
  }

  const CloseModal = () => {
    setSelectedModal(null)
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

  const searchData = () => {
    if (calendarRef.current) {
      if (selectedButton === 'ANNUAL') {
        allAnnualList(CalDate.toString())
          .then(data => {
            const returnDatalist = data.data.response
            const modifiedReturnDatalist = returnDatalist.map(item => ({
              title: getTitleWithStatus(item),
              username: item.username,
              start: new Date(item.startDate),
              end: new Date(item.endDate),
              type: 'ANNUAL'
            }))
            setViewDrow(modifiedReturnDatalist)
            setData(modifiedReturnDatalist)
          })
          .catch(error => {
            console.error('Error fetching data:', error)
          })
      } else {
        allDutyList(CalDate.toString())
          .then(data => {
            const returnDatalist = data.data.response
            const modifiedReturnDatalist = returnDatalist.map(item => ({
              ...item,
              title: getTitleWithStatus(item),
              username: item.username,
              date: new Date(item.dutyDate),
              type: 'DUTY'
            }))
            setViewDrow(modifiedReturnDatalist)
            setData(modifiedReturnDatalist)
          })
          .catch(error => {
            console.error(error)
          })
      }
    } else {
      console.log('년도를 찾을수 없습니다.')
    }
  }

  useEffect(() => {
    searchData()
  }, [selectedButton, CalDate])

  useEffect(() => {
    setActiveButton('DUTY')
  }, [])

  return (
    <ApplyWrapper>
      <ApplyTitle></ApplyTitle>
      <Topimagesbox />
      <Rectangle>
        <ApplyContainer>
          <BarBox>
            <CommonBarButton />
          </BarBox>
          <ButtonContainer>
            <AnnualButton
              isActive={activeButton === 'ANNUAL'}
              onClick={() => handleButtonClick('ANNUAL')}
              data-select="ANNUAL">
              {dayApplyTexts.anuualSchedule}
            </AnnualButton>
            <DutyButton
              isActive={activeButton === 'DUTY'}
              onClick={() => handleButtonClick('DUTY')}
              data-select="DUTY">
              {dayApplyTexts.dutySchedule}
            </DutyButton>
          </ButtonContainer>
          <ApplyCalendar
            handleModalClick={handleModalClick}
            eventContent={eventContent}
            handleDatesSet={handleDatesSet}
            viewDrow={viewDrow}
            calendarRef={calendarRef}
          />
          {selectedModal === 'ANNUAL_MODAL' && (
            <AnnualModal
              close={CloseModal}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              searchData={searchData}
              data={data}
              username={username}
            />
          )}
          {selectedModal === 'DUTY_MODAL' && (
            <DuttyModal
              close={CloseModal}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              searchData={searchData}
              data={data}
              username={username}
            />
          )}
        </ApplyContainer>
      </Rectangle>
    </ApplyWrapper>
  )
}

const ApplyWrapper = styled.div`
  width: 1060px;
  position: relative;
  right: 50px;
`

const Rectangle = styled.div`
  padding-bottom: 40px;
`
const ApplyTitle = styled.div`
  margin-top: 40px;
  padding-left: 20px;
  color: ${props => props.theme.colors.listTitle};
  font-size: 20px;
  font-weight: 700;
`

const ApplyContainer = styled.div`
  width: 1409px;
  position: relative;
  margin: auto;
  top: 50px;
  padding-bottom: 1000px;
`
const BarBox = styled.div`
  width: 140px;
  float: right;
  margin-right: 200px;
  bottom: 50px;
  position: relative;
  font-weight: bold;
`

const ButtonContainer = styled.div`
  width: 110px;
  position: relative;
  display: flex;
  gap: 15px;
  float: left;
  margin-left: -100px;
  flex-direction: column;
`
const AnnualButton = styled.button.attrs<{ isActive: boolean }>(props => ({
  isActive: props.isActive || false
}))`
  width: 125px;
  color: ${props => props.theme.colors.white};
  border-radius: 10px;
  padding: 20px;
  font-weight: 800;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  background-color: ${props => (props.isActive ? '#0C356A' : '#1a3ba5e2')};
  margin-left: ${props => (props.isActive ? '-20px' : '-10px')};
`

const DutyButton = styled(AnnualButton)``
