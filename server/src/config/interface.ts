import { Request } from 'express'
import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  account: string
  password: string
  avatar: string
  role: string
  type: string
  _doc: Object
}

export interface ICard extends Document {
  board: string
  column: string
  content: string
  thumbnail?: string
}

export interface IColumn extends Document {
  board: string
  title: string
  cardOrder: ICard[]
}

export interface IBoard extends Document {
  user: string
  title: string
  columnOrder: IColumn[]
}

export interface INewUser {
  name: string
  account: string
  password: string
}

export interface IDecodedToken {
  id?: string
  newUser?: INewUser
  iat: number
  exp: number
}

export interface IReqAuth extends Request {
  user?: IUser
}
