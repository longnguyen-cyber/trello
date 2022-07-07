import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAPI } from '../utils/FetchData'
import { IBoardHome, RootStore } from '../utils/types'
const Board = () => {
  const { id } = useParams()
  const [board, setBoard] = useState<IBoardHome>()
  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if (!auth.access_token || !id) return
    getAPI(`board/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => console.log(err))
  }, [auth.access_token, id])

  return (
    <div>
      {board?.title} - {auth.user?.name}
    </div>
  )
}

export default Board
