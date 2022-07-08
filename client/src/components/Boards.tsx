import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { createBoard } from '../redux/actions/boardAction'
import { IBoardModal, RootStore, TypedDispatch } from '../utils/types'
import Board from './Board'
import Modal from './Modal'

const Boards = () => {
  let navigate = useNavigate()
  const { boards } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch<TypedDispatch>()

  const handleCreateBoard = (body: IBoardModal, token: string) => {
    dispatch(createBoard(body, token))
  }
  // const data = [
  //   {
  //     _id: '62c68a91caa35f0ac95ffe1a',
  //     title: 'test board',
  //     columnOrder:['1','2'],
  //     columns: [
  //       {
  //         _id: '1',
  //         board: '62c68a91caa35f0ac95ffe1a',
  //         title: 'column 1',
  //         cardOrder: ['1', '2'],
  //         cards: [
  //           {
  //             _id: '1',
  //             title: 'card1',
  //             thumbnail: 'http://source.unsplash.com/random'
  //           },
  //           {
  //             _id: '2',
  //             title: 'card2'
  //           },
  //           {
  //             _id: '3',
  //             title: 'card3',
  //             thumbnail: 'http://source.unsplash.com/random'
  //           },
  //           {
  //             _id: '4',
  //             title: 'card4'
  //           }
  //         ]
  //       },
  //       {
  //         _id: '2',
  //         board: '62c68a91caa35f0ac95ffe1a',
  //         title: 'column 2',
  //         cardOrder: ['3', '4'],
  //         cards: [
  //           {
  //             _id: '3',
  //             title: 'card1',
  //             thumbnail: 'http://source.unsplash.com/random'
  //           },
  //           {
  //             _id: '2',
  //             title: 'card2'
  //           },
  //           {
  //             _id: '4',
  //             title: 'card3',
  //             thumbnail: 'http://source.unsplash.com/random'
  //           },
  //           {
  //             _id: '4',
  //             title: 'card4'
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ]
  return (
    <div className="mt-12 mx-12 flex-1">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">ALl Board</h2>
        <Modal callback={handleCreateBoard} />
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
