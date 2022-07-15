import { ICard, IModal } from '../../utils/types'

export const CREATE_CARD = 'CREATE_CARD'
export const GET_CARDS = 'GET_CARDS'

export interface IGetCardsType {
  type: typeof GET_CARDS
  payload: ICard[]
}

export interface ICreateCardType {
  type: typeof CREATE_CARD
  payload: IModal
}

export type ICardType = ICreateCardType | IGetCardsType
