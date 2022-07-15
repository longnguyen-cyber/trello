import { IColumn } from '../../utils/types'

export const CREATE_COLUMN = 'CREATE_COLUMN'
export const GET_COLUMNS = 'GET_COLUMNS'

export interface IGetColumnsType {
  type: typeof GET_COLUMNS
  payload: IColumn[]
}

export interface ICreateCardType {
  type: typeof CREATE_COLUMN
  payload: IColumn
}

export type IColumnType = ICreateCardType | IGetColumnsType
