import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAPI } from '../utils/FetchData'
import { IBoard } from '../utils/types'
import { showErrMsg } from './altert/Alert'
import Loading from './altert/Loading'
import DisplayBoard from './DisplayBoard'

const Board = () => {
  const { id } = useParams<string>()
  const [board, setBoard] = useState<IBoard>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    if (!id) return

    setLoading(true)

    getAPI(`board/${id}`)
      .then((res) => {
        setBoard(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response.data.msg)
        setLoading(false)
      })

    return () => setBoard(undefined)
  }, [id])

  if (loading) <Loading />

  return (
    <div>
      {error && showErrMsg(error)}
      {board && <DisplayBoard board={board} />}
    </div>
  )
}

export default Board
