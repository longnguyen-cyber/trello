import { Dispatch } from 'react'
import { imageUpload } from '../../utils/imageUpload'
import {
  CREATE_BOARD,
  GET_BOARDS,
  IBoardType,
  IGetBoardsType
} from '../types/boardType'
import { getAPI, postAPI } from './../../utils/FetchData'
import { IBoardModal } from './../../utils/types'
import { ALERT, IAlertType } from './../types/alertType'
export const getBoards =
  (token: string) =>
  async (dispatch: Dispatch<IGetBoardsType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await getAPI('board', token)
      dispatch({ type: GET_BOARDS, payload: res.data })

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
export const createBoard =
  (board: IBoardModal, token: string) =>
  async (dispatch: Dispatch<IBoardType | IAlertType>) => {
    if (!token)
      return dispatch({
        type: ALERT,
        payload: { errors: 'you are not logged' }
      })
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      let url = ''
      if (board.thumbnail)
        if (typeof board.thumbnail !== 'string') {
          const photo = await imageUpload(board.thumbnail)
          dispatch({ type: ALERT, payload: { loading: true } })
          url = photo.url
        } else {
          url = board.thumbnail
        }

      const newBoard = { ...board, thumbnail: url }

      const res = await postAPI('board', newBoard, token)

      dispatch({
        type: CREATE_BOARD,
        payload: res.data
      })

      dispatch({ type: ALERT, payload: { success: 'create successfully!' } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
