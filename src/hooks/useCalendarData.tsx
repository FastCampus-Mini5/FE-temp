import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { ItemUsername } from '@/components'

export type Item = {
  title: string
  start: string
  end: string
  type: string
  status: string
  username: string
}

export const useCalendarData = (
  fetchDataFunction1: Promise<AxiosResponse>,
  fetchDataFunction2: Promise<AxiosResponse>,
  getMyTitle: (item: ItemUsername) => string,
  CalDate: number
) => {
  const [viewDrow, setViewDrow] = useState<Item[]>([
    {
      title: '',
      start: '',
      end: '',
      status: '',
      type: '',
      username: ''
    }
  ])

  useEffect(() => {
    Promise.all([fetchDataFunction1, fetchDataFunction2])
      .then(([data1, data2]) => {
        const processedData1 = data1.data.response.map(
          item =>
            ({
              title: getMyTitle(item),
              start: new Date(item.startDate).toISOString(),
              end: new Date(item.endDate).toISOString(),
              type: 'ANNUAL',
              status: ''
            }) as Item
        )

        const processedData2 = data2.data.response.map(
          item =>
            ({
              ...item,
              title: getMyTitle(item),
              date: new Date(item.dutyDate),
              type: 'DUTY',
              status: ''
            }) as Item
        )
        const combinedData = [...processedData1, ...processedData2]
        setViewDrow(combinedData)
      })
      .catch(error => {
        console.error('error', error)
      })
  }, [CalDate])

  return { viewDrow }
}
