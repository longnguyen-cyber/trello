import { UPDATE_CARD } from './../types/cardType'
import { ICard } from '../../utils/types'
import {
  CREATE_CARD,
  DELETE_CARD,
  GET_CARDS,
  ICardType
} from '../types/cardType'

const cardReducer = (state: ICard[] = [], action: ICardType): ICard[] => {
  switch (action.type) {
    case GET_CARDS:
      return action.payload
    case CREATE_CARD:
      return [...state, action.payload]
    case DELETE_CARD:
      return state.filter((item) => item._id !== action.payload._id)
    case UPDATE_CARD:
      return state.map((card) =>
        card._id === action.payload._id
          ? {
              ...card,
              title: action.payload.title,
              thumbnail: action.payload.thumbnail
            }
          : card
      )
    default:
      return state
  }
}

export default cardReducer
