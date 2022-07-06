import { getAPI } from './../../utils/FetchData'
import { ALERT, IAlertType } from './../types/alertType'
import { AUTH, IAuthType } from './../types/authType'
import { Dispatch } from 'react'
import { IUserLogin, IUserRisger } from './../../utils/types'
import { postAPI } from '../../utils/FetchData'
import { validRegister } from '../../utils/valid'
export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await postAPI('login', userLogin)
      console.log(res)
      dispatch({
        type: AUTH,
        payload: res.data
      })

      window.location.href = '/'
      localStorage.setItem('logged', 'user')

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
      console.log(error)
    }
  }

export const refreshToken =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem('logged')

    if (logged !== 'user') return

    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await getAPI('refresh_token')
      dispatch({ type: AUTH, payload: res.data })

      dispatch({ type: ALERT, payload: {} })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
      localStorage.removeItem('logged')
    }
  }

export const logout =
  (token: string) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    try {
      localStorage.removeItem('logged')
      dispatch({ type: ALERT, payload: {} })

      await getAPI('logout', token)
      window.location.href = '/'

      dispatch({ type: ALERT, payload: { success: 'Logout success' } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
export const register =
  (user: IUserRisger) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    const checkRegisger = validRegister(user)
    if (checkRegisger.errLength > 0)
      dispatch({ type: ALERT, payload: { errors: checkRegisger.errMsg } })
    try {
      dispatch({ type: ALERT, payload: { loading: true } })
      const res = await postAPI('register', user)
      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
