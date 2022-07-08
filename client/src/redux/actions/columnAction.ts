import { Dispatch } from 'react'
import { postAPI } from '../../utils/FetchData'
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
