import { ICardModal } from '../../utils/types'

export const CREATE_CARD = 'CREATE_CARD'
export const GET_BOARDS = 'GET_BOARDS'

export interface ICreateCardType {
  type: typeof CREATE_CARD
  payload: ICardModal
}

export type ICardType = ICreateCardType
