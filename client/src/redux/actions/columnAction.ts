import { GET_COLUMNS, IGetColumnsType } from './../types/columnType'
import { Dispatch } from 'react'
import { getAPI, postAPI } from '../../utils/FetchData'
import { CREATE_COLUMN, IColumnType } from '../types/columnType'
import { ALERT, IAlertType } from './../types/alertType'

export const createColumn =
  (title: string, boardID: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IColumnType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await postAPI(`board/${boardID}`, { title }, token)

      dispatch({ type: CREATE_COLUMN, payload: res.data })

      dispatch({ type: ALERT, payload: { success: 'create successfully!' } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
export const getColumns =
  (id: string, token: string) =>
  async (dispatch: Dispatch<IGetColumnsType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await getAPI(`board/column/${id}`, token)
      dispatch({ type: GET_COLUMNS, payload: res.data })

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
