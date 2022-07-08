import { IColumn } from '../../utils/types'
import { CREATE_COLUMN, GET_COLUMNS, IColumnType } from '../types/columnType'

const columnReducer = (
  state: IColumn[] = [],
  action: IColumnType
): IColumn[] => {
  switch (action.type) {
    case GET_COLUMNS:
      return action.payload
    case CREATE_COLUMN:
      return [action.payload, ...state]
    default:
      return state
  }
}

export default columnReducer
