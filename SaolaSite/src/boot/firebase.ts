import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCX0Z_kC9uQYRCF3Cih9RJmcrUKM3Y30sU',
  authDomain: 'saola-e169d.firebaseapp.com',
  projectId: 'saola-e169d',
  storageBucket: 'saola-e169d.appspot.com',
  messagingSenderId: '211149671194',
  appId: '1:211149671194:web:aa86aa6f1e8604e7013aa3',
  measurementId: 'G-CEE40JLNNV'
}

// const analytics = getAnalytics(app)

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
