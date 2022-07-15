import { Dispatch } from 'react'
import { deleteAPI, getAPI, patchAPI, postAPI } from '../../utils/FetchData'
import { IColumn } from '../../utils/types'
import { CREATE_COLUMN, IColumnType } from '../types/columnType'
import { ALERT, IAlertType } from './../types/alertType'
import {
  DELETE_COLUMN,
  GET_COLUMNS,
  IDeleteColumnType,
  IGetColumnsType,
  IUpdateColumnType,
  UPDATE_COLUMN
} from './../types/columnType'

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

export const deleteColumn =
  (column: IColumn, token: string) =>
  async (dispatch: Dispatch<IDeleteColumnType | IAlertType>) => {
    if (!token)
      return dispatch({
        type: ALERT,
        payload: { errors: 'You are not logged!' }
      })
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      dispatch({
        type: DELETE_COLUMN,
        payload: column
      })
      await deleteAPI(`board/${column.board}/${column._id}`, token)

      dispatch({ type: ALERT, payload: { success: 'Delete successfully!' } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const updateColumn =
  (column: IColumn, token: string) =>
  async (dispatch: Dispatch<IUpdateColumnType | IAlertType>) => {
    if (!token)
      return dispatch({
        type: ALERT,
        payload: { errors: 'You are not logged!' }
      })
    try {
      await patchAPI(`board/${column.board}/${column._id}`, column, token)
      dispatch({
        type: UPDATE_COLUMN,
        payload: column
      })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
