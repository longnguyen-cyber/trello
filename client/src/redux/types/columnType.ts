import { IColumn } from '../../utils/types'

export const CREATE_COLUMN = 'CREATE_COLUMN'
export const GET_COLUMNS = 'GET_COLUMNS'
export const DELETE_COLUMN = 'DELETE_COLUMN'
export const UPDATE_COLUMN = 'UPDATE_COLUMN'
export interface IGetColumnsType {
  type: typeof GET_COLUMNS
  payload: IColumn[]
}

export interface ICreateCardType {
  type: typeof CREATE_COLUMN
  payload: IColumn
}

export interface IDeleteColumnType {
  type: typeof DELETE_COLUMN
  payload: IColumn
}

export interface IUpdateColumnType {
  type: typeof UPDATE_COLUMN
  payload: IColumn
}
export type IColumnType =
  | ICreateCardType
  | IGetColumnsType
  | IDeleteColumnType
  | IUpdateColumnType
