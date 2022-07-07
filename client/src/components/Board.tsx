import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAPI } from '../utils/FetchData'
import { IBoardHome, RootStore } from '../utils/types'
import Column from './Column'
import Navbar from './Navbar'
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
    <div
      className="h-screen object-fit bg-no-repeat bg-cover w-full"
      style={{ backgroundImage: `url(${board?.thumbnail})` }}
    >
      <Navbar token={auth.access_token} />
      <div className="text-white text-center text-4xl py-2 relative">
        {board?.title}
      </div>
      <div className="flex overflow-x-auto space-x-4 boards mx-8">
        <div className="bg-white rounded py-2 column max-w-default mb-4">
          <Column />
        </div>
      </div>
    </div>
  )
}

export default Board
