export type PostType = {
    id: number | null
    message: string | null
    like: number  | null
  }
  
export type contactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
  }
  
export type photosType = {
    small: string | null
    large: string | null
  }
  
export type ProfileType = {
    userId: number | null,
    lookingForAJob: boolean | null,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    contacts: contactsType | null,
    photos: photosType | null
  }

export type userType = {
    id: number
    name: number
    status: string
    photos: photosType
    followed: boolean
  }
  