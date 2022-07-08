import { ICard, ICardModal } from '../../utils/types'
import { CREATE_CARD, ICardType } from '../types/cardType'

const cardReducer = (state: ICard[] = [], action: ICardType): ICardModal[] => {
  switch (action.type) {
    case CREATE_CARD:
      return [action.payload, ...state]
    default:
      return state
  }
}

export default cardReducer
