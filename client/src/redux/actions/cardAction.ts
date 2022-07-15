import { Dispatch } from 'react'
import { getAPI, postAPI } from '../../utils/FetchData'
import { imageUpload } from '../../utils/imageUpload'
import {
  CREATE_CARD,
  GET_CARDS,
  ICardType,
  IGetCardsType
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

      console.log(res)

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
