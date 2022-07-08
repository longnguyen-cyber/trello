import { ChangeEvent, FormEvent } from 'react'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import rootReducer from '../redux/reducers'

export type RootStore = ReturnType<typeof rootReducer>

export type TypedDispatch = ThunkDispatch<RootStore, any, AnyAction>

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
export interface IBoard {
  _id?: string | number
  user?: string | IUser
  title: string
  thumbnail: string | File
  columnOrder?: string[]
}

export interface IColumn {
  _id?: string
  board: string
  title?: string
  cardOrder?: string[]
}

export interface ICardModal extends IBoard {
  thumbnail: string | File
}

export interface ICard extends IBoard {
  thumbnail: string
}

export interface IAlert {
  loading?: boolean
  success?: string | string[]
  errors?: string | string[]
}
