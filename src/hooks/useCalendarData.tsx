import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

export const useCalendarData = (
  fetchDataFunction1: Promise<AxiosResponse<any, any>>,
  fetchDataFunction2: Promise<AxiosResponse<any, any>>,
  getMyTitle,
  CalDate: unknown
) => {
  const [viewDrow, setViewDrow] = useState([
    {
      title: '',
      start: '',
      end: '',
      status: '',
      type: ''
    }
  ])

  useEffect(() => {
    Promise.all([fetchDataFunction1, fetchDataFunction2])
      .then(([data1, data2]) => {
        const processedData1 = data1.data.response.map((item: any) => ({
          title: getMyTitle(item),
          start: new Date(item.startDate).toISOString(),
          end: new Date(item.endDate).toISOString(),
          type: 'ANNUAL'
        }))

        const processedData2 = data2.data.response.map((item: any) => ({
          ...item,
          title: getMyTitle(item),
          date: new Date(item.dutyDate),
          type: 'DUTY'
        }))
        const combinedData = [...processedData1, ...processedData2]
        setViewDrow(combinedData)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [CalDate])

  return { viewDrow }
}
