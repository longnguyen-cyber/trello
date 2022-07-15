import { Dispatch } from 'react'
import { deleteAPI, getAPI, patchAPI, postAPI } from '../../utils/FetchData'
import { imageUpload } from '../../utils/imageUpload'
import {
  CREATE_CARD,
  DELETE_CARD,
  GET_CARDS,
  ICardType,
  IDeleteCardType,
  IGetCardsType,
  IUpdateCardType,
  UPDATE_CARD
} from '../types/cardType'
import { ICard } from './../../utils/types'
import { ALERT, IAlertType } from './../types/alertType'

export const createCard =
  (card: ICard, boardID: string, columnID: string, token: string) =>
  async (dispatch: Dispatch<ICardType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      let url = ''
      if (card.thumbnail)
        if (typeof card.thumbnail !== 'string') {
          const photo = await imageUpload(card.thumbnail)
          dispatch({ type: ALERT, payload: { loading: true } })
          url = photo.url
        } else {
          url = card.thumbnail
        }

      const newCard = { ...card, thumbnail: url }

      const res = await postAPI(`board/${boardID}/${columnID}`, newCard, token)

      dispatch({
        type: CREATE_CARD,
        payload: res.data
      })

      dispatch({ type: ALERT, payload: { success: 'create successfully!' } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const getCards =
  (id: string, token: string) =>
  async (dispatch: Dispatch<IGetCardsType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await getAPI(`board/${id}/card`, token)

      dispatch({ type: GET_CARDS, payload: res.data })

      dispatch({ type: ALERT, payload: { loading: false } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const deleteCard =
  (card: ICard, token: string) =>
  async (dispatch: Dispatch<IDeleteCardType | IAlertType>) => {
    if (!token)
      return dispatch({
        type: ALERT,
        payload: { errors: 'You are not logged!' }
      })
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      dispatch({
        type: DELETE_CARD,
        payload: card
      })
      await deleteAPI(`board/${card.board}/${card.column}/${card._id}`, token)

      dispatch({ type: ALERT, payload: { success: 'Delete successfully!' } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }

export const updateCard =
  (card: ICard, token: string) =>
  async (dispatch: Dispatch<IUpdateCardType | IAlertType>) => {
    if (!token)
      return dispatch({
        type: ALERT,
        payload: { errors: 'You are not logged!' }
      })
    try {
      let url = ''
      if (card.thumbnail)
        if (typeof card.thumbnail !== 'string') {
          const photo = await imageUpload(card.thumbnail)
          dispatch({ type: ALERT, payload: { loading: true } })
          url = photo.url
        } else {
          url = card.thumbnail
        }

      const newCard = { ...card, thumbnail: url }
      await patchAPI(
        `board/${card.board}/${card.column}/${card._id}`,
        newCard,
        token
      )
      dispatch({
        type: UPDATE_CARD,
        payload: newCard
      })

      dispatch({ type: ALERT, payload: { success: 'Update successfully!' } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
