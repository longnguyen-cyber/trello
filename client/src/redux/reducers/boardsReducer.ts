import { CREATE_BOARD, GET_BOARDS, IBoardType } from '../types/boardType'
import { IBoard } from './../../utils/types'

const boardsReducer = (state: IBoard[] = [], action: IBoardType): IBoard[] => {
  switch (action.type) {
    case GET_BOARDS:
      return action.payload
    case CREATE_BOARD:
      return [action.payload, ...state]
    default:
      return state
  }
}

export default boardsReducer
