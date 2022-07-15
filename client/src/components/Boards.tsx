import _ from 'lodash'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { createBoard } from '../redux/actions/boardAction'
import { IBoard, IModal, RootStore, TypedDispatch } from '../utils/types'
import Modal from './Modal'

const Boards = () => {
  let navigate = useNavigate()
  const { boards } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch<TypedDispatch>()

  const inititalState = {
    title: '',
    thumbnail: ''
  }

  const [board, setBoard] = useState<IBoard>(inititalState)
  const handleCreateBoard = (board: IModal, token: string) => {
    if (!board.thumbnail) return
    dispatch(createBoard(board, token))
  }
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="mt-12 mx-12 flex-1">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">ALl Board</h2>
        <button
          className={`bg-blue-500 active:bg-blue-600 text-white font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg text-sm outline-none focus:outline-none m-1 ease-linear transition-all duration-150 text-center `}
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add board
        </button>
        <Modal
          callback={handleCreateBoard}
          body={board}
          setBody={setBoard}
          showModal={showModal}
          setShowModal={setShowModal}
        />
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
            {typeof item.thumbnail === 'string' && (
              <img
                src={item.thumbnail}
                alt=""
                className="w-full object-fill h-40"
              />
            )}
            <div
              className="absolute top-2/4 left-2/4 text-white font-semibold text-2xl"
              style={{ transform: 'translate(-50%,-50%)' }}
            >
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
        <Outlet />
      </div>
      {_.isEmpty(boards) && (
        <div className="flex my-40">
          <h4 className="text-5xl px-40 mx-auto font-bold">
            Do you want create board ?
          </h4>
        </div>
      )}
    </div>
  )
}

export default Boards
