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
  
export type PhotosType = {
    small: string | null
    large: string | null
  }
  
export type ProfileType = {
    userId: number | null,
    lookingForAJob: boolean | null,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    contacts: contactsType | null,
    photos: PhotosType | null
  }

export type UserType = {
    id: number
    name: string
    status: string | null
    photos: PhotosType
    followed: boolean
  }

export type DialogType = {
  id: number,
  name: string
};
export type MessageType = {
  id: number,
  message: string
}

export type DialogsPageType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
};
