import { IColumn } from '../../utils/types'
import {
  CREATE_COLUMN,
  DELETE_COLUMN,
  GET_COLUMNS,
  IColumnType,
  UPDATE_COLUMN
} from '../types/columnType'

const columnReducer = (
  state: IColumn[] = [],
  action: IColumnType
): IColumn[] => {
  switch (action.type) {
    case GET_COLUMNS:
      return action.payload
    case CREATE_COLUMN:
      return [...state, action.payload]
    case DELETE_COLUMN:
      return state.filter((item) => item._id !== action.payload._id)
    case UPDATE_COLUMN:
      return state.map((column) =>
        column._id === action.payload._id
          ? {
              ...column,
              title: action.payload.title
            }
          : column
      )
    default:
      return state
  }
}

export default columnReducer
