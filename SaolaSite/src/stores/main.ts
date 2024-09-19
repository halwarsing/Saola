import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth'
import {
  collection,
  getDoc,
  getDocs,
  setDoc,
  doc,
  query,
  serverTimestamp,
  where,
  limit
} from 'firebase/firestore'

import { db } from 'src/boot/firebase'
import {
  showError
} from 'src/helpers'
import {
  ProfileInfo,
  FullProfileInfo,
  NewsInfo,
  EventInfo,
  LifehackInfo,
  UpdateProfilePayload
} from 'src/types'

const checkNotUniqueUsername = async (username: string) => {
  const searchUniqueUsernamesRef = query(collection(db, 'profiles'), where('username', '==', username), limit(1))
  const searchResultsSnapshots = await getDocs(searchUniqueUsernamesRef)
  return searchResultsSnapshots.size > 0
}

export const useStore = defineStore('profile', {
  state: () => ({
    isLoading: true,
    isAuth: false,
    news: [] as NewsInfo[],
    events: [] as EventInfo[],
    lifehacks: [] as LifehackInfo[],
    profile: {
      email: null,
      uid: null,
      username: null,
      isOrganisation: true,
      avatar: null
    } as FullProfileInfo
  }),

  actions: {
    init () {

    },

    async setProfile (user: User) {
      if (this.$state.profile.uid === user.uid) return
      const profileSnapshot = await getDoc(doc(db, 'profiles', user.uid))
      const profileData = profileSnapshot.data()
      this.$state.profile.email = user.email
      this.$state.profile.uid = user.uid
      if (profileData) {
        this.$state.profile.bio = profileData.bio
        this.$state.profile.avatar = profileData.avatar
        this.$state.profile.username = profileData.username
        this.$state.profile.isOrganisation = profileData.isOrganisation
      }
      nextTick(() => {
        this.$state.isAuth = true
      })
    },

    async signIn (email: string, password: string) {
      try {
        const auth = getAuth()
        const credential = await signInWithEmailAndPassword(auth, email, password)
        this.setProfile(credential.user)
      } catch {
        showError('Не удалось войти в систему')
      }
    },

    async signUp (info: ProfileInfo) {
      try {
        if (await checkNotUniqueUsername(info.username)) {
          showError('Такое имя пользователя уже существует, придумайте другое')
          return
        }
        const auth = getAuth()
        const credential = await createUserWithEmailAndPassword(auth, info.email, info.password)
        const user = credential.user
        await setDoc(doc(db, 'profiles', user.uid), {
          isOrganisation: info.isOrganisation,
          username: info.username,
          bio: '',
          created: serverTimestamp()
        })
        this.$state.profile.bio = info.bio
        this.$state.profile.isOrganisation = info.isOrganisation
        this.$state.profile.username = info.username
        this.$state.profile.email = user.email
        this.$state.profile.uid = user.uid
        nextTick(() => {
          this.$state.isAuth = true
        })
      } catch {
        showError('Не удалось создать аккаунт')
      }
    },

    async signOut () {
      try {
        const auth = getAuth()
        await signOut(auth)
        this.$state.isAuth = false
      } catch {
        showError('Не удалось выйти из системы')
      }
    },

    async saveProfile (info: UpdateProfilePayload): Promise<void> {
      try {
        if (this.profile.uid) {
          const profileRef = doc(db, 'profiles', this.profile.uid)
          if (this.profile.username !== info.username && await checkNotUniqueUsername(info.username)) {
            showError('Такое имя пользователя уже существует, придумайте другое')
            return
          }
          await setDoc(profileRef, {
            updated: serverTimestamp(),
            username: info.username,
            avatar: info.avatar,
            bio: info.bio
          }, { merge: true })
          this.$state.profile.username = info.username
          this.$state.profile.avatar = info.avatar
        }
      } catch {
        showError('Не удалось обновить профиль')
      }
    }
  }
})
