export type AppModuleInfo = {
  id: string
  label: string
  visibility: ('header' | 'footer')[]
  icon?: string
  notifications?: number
}

export type AppInjectInfo = {
  isMobile: boolean
  modules: AppModuleInfo[]
}

export type SelectOption = {
  label: string
  value: string
}

export type AnyFunction<T = void> = (...args: any[]) => T
