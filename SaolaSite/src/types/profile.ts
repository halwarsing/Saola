export type ProfileInfo = {
  avatar?: string
  bio: string
  email: string
  password: string
  username: string
  isOrganisation: boolean
}

export type FullProfileInfo = {
  email: string | null
  uid: string | null
  username: string | null
  bio: string
  isOrganisation: boolean
  avatar: string | null
}

export type UpdateProfilePayload = {
  avatar: string
  username: string
  bio: string
}
