import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { postAPI } from '../utils/FetchData'
import { showErrMsg, showSuccessMsg } from './altert/Alert'
import Navbar from './Navbar'

const Active = () => {
  const { id } = useParams()

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (id)
      postAPI('active', { active_token: id })
        .then((res) => setSuccess(res.data.msg))
        .catch((err) => setError(err.respone.data.msg))
  }, [id])

  return (
    <div>
      <Navbar />
      {error && showErrMsg(error)}
      {success && showSuccessMsg(success)}
    </div>
  )
}

export default Active
