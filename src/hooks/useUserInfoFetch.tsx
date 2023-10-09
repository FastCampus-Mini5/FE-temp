import { useEffect } from 'react'
import { getUserInfo } from 'api/index'
import DefaultImage from 'assets/dafault.png'

export const useUserInfoFetch = (
  fcUsername,
  fcProfileImage,
  fcRemain,
  fcEmail
) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserInfo()
        fcUsername(res?.response?.username)
        fcEmail(res?.response?.email)

        if (res?.response?.profileImage === '/image/default.png') {
          fcProfileImage(DefaultImage)
        } else {
          fcProfileImage(res?.response?.profileImage)
        }

        fcRemain(res?.response?.remainVacation)
      } catch (error) {
        // 오류 처리
        console.error('데이터 가져오기 실패:', error)
      }
    }

    fetchData()
  }, [])

  return { fcUsername, fcProfileImage, fcRemain, fcEmail }
}
