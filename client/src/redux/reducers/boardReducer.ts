import { CREATE_BOARD, GET_BOARDS, IBoardType } from '../types/boardType'
import { IBoard, IBoardHome } from './../../utils/types'

const boardReducer = (
  state: IBoard[] = [],
  action: IBoardType
): IBoardHome[] => {
  switch (action.type) {
    case GET_BOARDS:
      return action.payload
    case CREATE_BOARD:
      return [action.payload, ...state]
    default:
      return state
  }
}

export default boardReducer
