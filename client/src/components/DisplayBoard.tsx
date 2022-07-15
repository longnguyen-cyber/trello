/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiPlus } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBoard, updateBoard } from '../redux/actions/boardAction'
import { createColumn } from '../redux/actions/columnAction'
import {
  FormSubmit,
  IBoard,
  IColumn,
  InputChange,
  RootStore,
  TypedDispatch
} from '../utils/types'
import Column from './Column'
import Navbar from './Navbar'
import SideBar from './SideBar'
interface IProps {
  columns: IColumn[]
  board: IBoard
  setBoard: (board: IBoard) => void
}
const DisplayBoard = ({ columns, board, setBoard }: IProps) => {
  const { auth } = useSelector((state: RootStore) => state)
  const { id } = useParams()
  const navigate = useNavigate()

  const columnDefault = {
    _id: 'default',
    board: 'default'
  }
  const dispatch = useDispatch<TypedDispatch>()

  const addColumn = () => {
    if (!auth.access_token || !id) return
    dispatch(createColumn('new column', id, auth.access_token))
    return <Column column={columnDefault} />
  }

  const handleInputChange = (e: InputChange) => {
    const { name, value } = e.target
    setBoard({ ...board, [name]: value })
  }
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
  }

  const [showModal, setShowModal] = useState(false)
  const [openSideBar, setOpenSideBar] = useState(false)

  useEffect(() => {
    if (!auth.access_token) return
    dispatch(updateBoard(board, auth.access_token))
  }, [board])

  return (
    <div
      className={`h-screen object-fit bg-no-repeat bg-cover w-full relative ${
        (showModal || openSideBar) && 'board before:h-full before:bg-black'
      }`}
      style={{ backgroundImage: `url(${board.thumbnail})` }}
    >
      {openSideBar && (
        <SideBar
          open={openSideBar}
          setOpen={setOpenSideBar}
          board={board}
          setBoard={setBoard}
        />
      )}
      <>
        {showModal ? (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              <form
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                onSubmit={handleSubmit}
              >
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Board Setting</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <AiOutlineCloseCircle />
                  </button>
                </div>
                <div className="relative px-6 flex-auto">
                  <div style={{ width: '60rem' }}>
                    <div className="my-4">
                      <label className="text-xl font-semibold">
                        Board name
                      </label>
                      <input
                        type="text"
                        className="form-control block w-full px-4 mt-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Add title"
                        name="title"
                        autoComplete="username"
                        value={board.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="my-4 flex justify-between items-center">
                      <label className="text-xl font-semibold">
                        Do you want delete board ?
                      </label>
                      <button
                        className="text-red-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150 outline-red-700
                        hover:bg-black"
                        type="submit"
                        onClick={() => {
                          if (!auth.access_token) return
                          dispatch(deleteBoard(board, auth.access_token))
                          navigate('/board')
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => {
                      if (!auth.access_token) return
                      dispatch(updateBoard(board, auth.access_token))
                    }}
                  >
                    Saving
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </>
      <Navbar token={auth.access_token} />

      <div className="text-white text-4xl flex justify-between items-center p-4">
        <h3>{board.title}</h3>
        <div className="flex items-center space-x-2">
          <button
            className="bg-white text-black font-bold p-2 rounded text-xl"
            onClick={() => setShowModal(true)}
          >
            <FiSettings />
          </button>
          <label
            className="cursor-pointer bg-white text-black font-bold p-2 rounded text-xl"
            onClick={() => {
              setOpenSideBar(!openSideBar)
            }}
          >
            <MdOutlinePhotoSizeSelectActual />
          </label>
        </div>
      </div>
      <div className="flex overflow-x-scroll overflow-y-hidden space-x-4 boards mx-8">
        {columns?.map((column) => (
          <div
            className="bg-white rounded py-2 column max-w-default h-fit"
            key={column._id}
            style={{
              marginBottom: '1rem'
            }}
          >
            <Column column={column} />
          </div>
        ))}
        <div className="bg-white rounded py-2 column max-w-default mb-4 text-center max-h-10">
          <div className="cursor-pointer" onClick={addColumn}>
            <BiPlus className="inline-block text-xl" />
            Add a column
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayBoard
