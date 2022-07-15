import { DELETE_BOARD, UPDATE_BOARD } from './../types/boardType'
import { CREATE_BOARD, GET_BOARDS, IBoardType } from '../types/boardType'
import { IBoard } from './../../utils/types'

const boardsReducer = (state: IBoard[] = [], action: IBoardType): IBoard[] => {
  switch (action.type) {
    case GET_BOARDS:
      return action.payload
    case CREATE_BOARD:
      return [...state, action.payload]
    case DELETE_BOARD:
      return state.filter((item) => item._id !== action.payload._id)
    case UPDATE_BOARD:
      return state.map((board) =>
        board._id === action.payload._id
          ? {
              ...board,
              title: action.payload.title,
              thumbnail: action.payload.thumbnail
            }
          : board
      )
    default:
      return state
  }
}

export default boardsReducer
