import { ICard, IModal } from '../../utils/types'

export const CREATE_CARD = 'CREATE_CARD'
export const GET_CARDS = 'GET_CARDS'
export const DELETE_CARD = 'DELETE_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'
export interface IGetCardsType {
  type: typeof GET_CARDS
  payload: ICard[]
}

export interface ICreateCardType {
  type: typeof CREATE_CARD
  payload: IModal
}
export interface IDeleteCardType {
  type: typeof DELETE_CARD
  payload: ICard
}

export interface IUpdateCardType {
  type: typeof UPDATE_CARD
  payload: ICard
}

export type ICardType =
  | ICreateCardType
  | IGetCardsType
  | IDeleteCardType
  | IUpdateCardType
