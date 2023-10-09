import styled from 'styled-components'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { ExcelAnnualList, ExcelDutyList } from 'api/index'
import { ExcelCategory } from 'constants/index'
import { useState } from 'react'

export const ExCelbox = () => {

  const [selectedOption, setSelectedOption] = useState('엑셀로 다운받기')

  const handleExcel = async () => {
    
    try {
      if (selectedOption === '연차') {
        const res = await ExcelAnnualList('2023')
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.download = `연차.xlsx`
        link.click()
      } else if (selectedOption === '당직') {
        const res = await ExcelDutyList('2023')
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.download = `당직.xlsx`
        link.click()
      }
    } catch (error) {
      console.error('Error fetching or generating Excel data:', error)
    }
  }

  const renderBox = () => (
    <>
      <option
        value="excel"
        selected>
        엑셀로 다운받기
      </option>
      {ExcelCategory.map(item => (
        <option key={item.id}>{item.name}</option>
      ))}
    </>
  )

  return (
    <>
      <ExcelBox>
        <Optionbox
          value={selectedOption}
          onChange={e => setSelectedOption(e.target.value)}>
          {renderBox()}
        </Optionbox>
        <AiOutlineCheckCircle
          onClick={handleExcel}
          style={{
            fontSize: '24px',
            color: '#ffff',
            cursor: 'pointer',
            marginLeft: '16px',
            marginTop: '10px'
          }}
        />
      </ExcelBox>
    </>
  )
}

const ExcelBox = styled.div`
  width: 180px;
  padding-bottom: 5px;
  float: left;
  border-radius: 3px;
  margin-top: 10px;
  padding-left: 10px;
  background-color: #1b9c85;
  font-size: 10px;
  cursor: pointer;
`
const Optionbox = styled.select`
  background-color: #1b9c85;
  border: none;
  color: #ffff;
  font-weight: bold;
  position: relative;
  bottom: 6px;
  &:focus {
    outline: none;
  }
`
