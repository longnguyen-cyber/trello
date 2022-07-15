import { ChangeEvent, FormEvent, MouseEventHandler } from 'react'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import rootReducer from '../redux/reducers'

export type RootStore = ReturnType<typeof rootReducer>

export type TypedDispatch = ThunkDispatch<RootStore, any, AnyAction>

export type Handler = MouseEventHandler<HTMLHeadingElement>

export type FormSubmit = FormEvent<HTMLFormElement>
export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>
export interface IUserLogin {
  account: string
  password: string
}

export interface IUserRisger extends IUserLogin {
  name: string
  cf_password: string
}
export interface IUser extends IUserLogin {
  _id: string
  name: string
  avatar: string
  type: string
  updatedAt: string
  createdAt: string
}

export interface IModal {
  title: string
  thumbnail?: string | File
}

export interface IBoard extends IModal {
  _id?: string | number
  user?: string | IUser
  columnOrder?: string[]
}

export interface IColumn {
  _id?: string
  board: string
  title?: string
  cardOrder?: string[]
}

export interface ICard extends IModal {
  _id?: string
  column?: string
  board?: string
}

export interface IAlert {
  loading?: boolean
  success?: string | string[]
  errors?: string | string[]
}

export interface IImg {
  id: string
  height: number
  width: number
  urls: {
    full: string
    raw: string
    regular: string
    small: string
    small_s3: string
    thumb: string
  }
  description: string
}
