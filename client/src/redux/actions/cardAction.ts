import { CREATE_CARD } from './../types/cardType'
import { Dispatch } from 'react'
import { postAPI } from '../../utils/FetchData'
import { imageUpload } from '../../utils/imageUpload'
import { ICreateCardType } from '../types/cardType'
import { ICardModal } from './../../utils/types'
import { ALERT, IAlertType } from './../types/alertType'

export const createCard =
  (card: ICardModal) =>
  async (dispatch: Dispatch<ICreateCardType | IAlertType>) => {
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

      // const res = await postAPI('car')

      dispatch({
        type: CREATE_CARD,
        payload: newCard
      })

      dispatch({ type: ALERT, payload: { success: 'create successfully!' } })
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } })
    }
  }
