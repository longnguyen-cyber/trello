import { IBoard } from '../../utils/types'

export const CREATE_BOARD = 'CREATE_BOARD'
export const DELETE_BOARD = 'DELETE_BOARD'
export const GET_BOARDS = 'GET_BOARDS'
export const GET_BOARD = 'GET_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'

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

export interface IDeleteBoardType {
  type: typeof DELETE_BOARD
  payload: IBoard
}

export interface IUpdateBoardType {
  type: typeof UPDATE_BOARD
  payload: IBoard
}

export type IBoardType =
  | ICreateBoardType
  | IGetBoardsType
  | IGetBoardType
  | IDeleteBoardType
  | IUpdateBoardType
