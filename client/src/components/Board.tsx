import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAPI } from '../utils/FetchData'
import { IBoard, IBoardHome, IColumn, RootStore } from '../utils/types'
import Column from './Column'
import Navbar from './Navbar'
import _ from 'lodash'

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

  const data: IColumn[] = [
    // {
    //   _id: '1',
    //   board: '62c68a91caa35f0ac95ffe1a',
    //   title: 'column 1',
    //   cardOrder: ['1', '2'],
    //   cards: [
    //     {
    //       _id: '1',
    //       title: 'card1',
    //       thumbnail: 'http://source.unsplash.com/random'
    //     },
    //     {
    //       _id: '2',
    //       title: 'card2'
    //     },
    //     {
    //       _id: '3',
    //       title: 'card3',
    //       thumbnail: 'http://source.unsplash.com/random'
    //     },
    //     {
    //       _id: '4',
    //       title: 'card4'
    //     }
    //   ]
    // },
    // {
    //   _id: '2',
    //   board: '62c68a91caa35f0ac95ffe1a',
    //   title: 'column 2',
    //   cardOrder: ['3', '4'],
    //   cards: [
    //     {
    //       _id: '3',
    //       title: 'card1',
    //       thumbnail: 'http://source.unsplash.com/random'
    //     },
    //     {
    //       _id: '2',
    //       title: 'card2'
    //     },
    //     {
    //       _id: '4',
    //       title: 'card3',
    //       thumbnail: 'http://source.unsplash.com/random'
    //     },
    //     {
    //       _id: '4',
    //       title: 'card4'
    //     }
    //   ]
    // }
  ]
  const columnDefault = {
    _id: '1',
    board: '62c68a91caa35f0ac95ffe1a'
  }
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
        {_.isEmpty(data) ? (
          <div className="bg-white rounded py-2 column max-w-default mb-4">
            <Column column={columnDefault} />
          </div>
        ) : (
          data.map((column) => (
            <div
              className="bg-white rounded py-2 column max-w-default mb-4"
              key={column._id}
            >
              <Column column={column} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Board
