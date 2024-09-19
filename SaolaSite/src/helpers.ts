import { Notify } from 'quasar'

export const showError = (text: string) => {
  Notify.create({
    type: 'negative',
    message: text,
    icon: 'fas fa-circle-exclamation'
  })
}

export const showSuccess = (text: string) => {
  Notify.create({
    type: 'positive',
    message: text,
    icon: 'fas fa-award'
  })
}

export const getImgPath = (path: string): string => {
  return new URL(path, import.meta.url).href
}
