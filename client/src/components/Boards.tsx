import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { RootStore } from '../utils/types'
import Board from './Board'
import Modal from './Modal'

const Boards = () => {
  let navigate = useNavigate()
  const { boards } = useSelector((state: RootStore) => state)

  return (
    <div className="mt-12 mx-12 flex-1">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">ALl Board</h2>
        <Modal />
      </div>
      <div className="grid grid-cols-4 space-x-4">
        {boards.map((item) => (
          <div
            key={item._id}
            className="relative board cursor-pointer"
            onClick={() => {
              navigate(`${item._id}`)
            }}
          >
            <img
              src={item.thumbnail}
              alt=""
              className="w-full object-fill h-40"
            />
            <div
              className="absolute top-2/4 left-2/4 text-white font-semibold text-2xl"
              style={{ transform: 'translate(-50%,-50%)' }}
            >
              <h3>{item.title}</h3>
            </div>
            <div className="hidden">
              <Board />
            </div>
          </div>
        ))}
        <Outlet />
      </div>
    </div>
  )
}

export default Boards
