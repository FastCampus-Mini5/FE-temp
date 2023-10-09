import { atom } from 'recoil'

export const remainState = atom({
  key: 'remainState', // 고유한 키
  default: 0 // 초기값
})

export const imageState = atom({
  key: 'imageState', // 고유한 키
  default: '' // 초기값
})

export const userState = atom({
  key: 'userState', // 고유한 키
  default: '' // 초기값
})