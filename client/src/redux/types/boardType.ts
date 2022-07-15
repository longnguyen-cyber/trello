import { IBoard } from '../../utils/types'

export const CREATE_BOARD = 'CREATE_BOARD'
export const GET_BOARDS = 'GET_BOARDS'
export const GET_BOARD = 'GET_BOARD'

export interface IGetBoardsType {
  type: typeof GET_BOARDS
  payload: IBoard[]
}
export interface IGetBoardType {
  type: typeof GET_BOARD
  payload: IBoard
}

export interface ICreateBoardType {
  type: typeof CREATE_BOARD
  payload: IBoard
}

export type IBoardType = ICreateBoardType | IGetBoardsType | IGetBoardType
