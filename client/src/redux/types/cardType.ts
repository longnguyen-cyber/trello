import { ICardModal } from '../../utils/types'

export const CREATE_CARD = 'CREATE_CARD'
export const GET_CARDS = 'GET_CARDS'

export interface IGetBoardsType {
  type: typeof GET_CARDS
  payload: ICardModal[]
}

export interface ICreateCardType {
  type: typeof CREATE_CARD
  payload: ICardModal
}

export type ICardType = ICreateCardType | IGetBoardsType
