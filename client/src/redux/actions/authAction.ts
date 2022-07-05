import { ALERT, IAlertType } from './../types/alertType'
import { IAuthType } from './../types/authType'
import { Dispatch } from 'react'
import { IUserLogin } from './../../utils/types'
import { postAPI } from '../../utils/FetchData'
export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await postAPI('login', userLogin)
      console.log(res)
    } catch (error: any) {
      console.log(error)
    }
  }
