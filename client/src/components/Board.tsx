import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getColumns } from '../redux/actions/columnAction'
import { getAPI } from '../utils/FetchData'
import { IBoard, RootStore, TypedDispatch } from '../utils/types'
import { showErrMsg } from './altert/Alert'
import Loading from './altert/Loading'
import DisplayBoard from './DisplayBoard'

const Board = () => {
  const { columns, auth } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch<TypedDispatch>()

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
  }, [id, dispatch])
  useEffect(() => {
    if (!id || !auth.access_token) return
    setLoading(true)

    dispatch(getColumns(id, auth.access_token))

    return () => setBoard(undefined)
  }, [dispatch, auth.access_token, id])

  if (loading) <Loading />

  return (
    <div>
      {error && showErrMsg(error)}
      {board && <DisplayBoard columns={columns} board={board} />}
    </div>
  )
}

export default Board
