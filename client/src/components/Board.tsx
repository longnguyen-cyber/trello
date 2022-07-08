import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAPI } from '../utils/FetchData'
import { IBoard, RootStore } from '../utils/types'
import { showErrMsg } from './altert/Alert'
import Loading from './altert/Loading'
import DisplayBoard from './DisplayBoard'

const Board = () => {
  const { auth } = useSelector((state: RootStore) => state)

  const { id } = useParams<string>()
  const [board, setBoard] = useState<IBoard>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    if (!id || !auth.access_token) return

    setLoading(true)

    getAPI(`board/${id}`, auth.access_token)
      .then((res) => {
        setBoard(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response.data.msg)
        setLoading(false)
      })

    return () => setBoard(undefined)
  }, [id, auth.access_token])

  console.log(board)

  if (loading) <Loading />

  return (
    <div>
      {error && showErrMsg(error)}
      {board && <DisplayBoard board={board} />}
    </div>
  )
}

export default Board
