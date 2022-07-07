import { IBoardHome, IBoardModal } from '../../utils/types'

export const CREATE_BOARD = 'CREATE_BOARD'
export const GET_BOARDS = 'GET_BOARDS'

export interface IGetBoardsType {
  type: typeof GET_BOARDS
  payload: IBoardHome[]
}

export interface ICreateBoardType {
  type: typeof CREATE_BOARD
  payload: IBoardModal
}

export type IBoardType = ICreateBoardType | IGetBoardsType
