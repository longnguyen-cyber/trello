import axios from 'axios'
import { API } from './config'
export const postAPI = async (url: string, post: object, token?: string) => {
  const res = await axios.post(`${API}/api/${url}`, post, {
    headers: { Authorization: token as string }
  })

  return res
}
