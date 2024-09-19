import type { InjectionKey } from 'vue'

import { AppInjectInfo } from 'src/types'

export const appKey: InjectionKey<AppInjectInfo> = Symbol('app')
