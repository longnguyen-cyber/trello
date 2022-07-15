/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { FormSubmit, IBoard, IImg, RootStore } from '../utils/types'

const API = 'IklDGdI-QyOhnknSIY6w3ejoHuVBhNAWcqqHV9hmM2w'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
  board: IBoard
  setBoard: (board: IBoard) => void
}

const SideBar: React.FC<IProps> = ({ open, setOpen, board, setBoard }) => {
  const [img, setImg] = useState('')
  const [res, setRes] = useState<IImg[]>()

  const { auth } = useSelector((state: RootStore) => state)
  const fetchRequest = async () => {
    await axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&query=${
          img === '' ? 'galaxy' : img
        }&client_id=${API}`
      )
      .then((res) => {
        setRes(res.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchRequest()
  }, [])

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    fetchRequest()
  }
  const handleClose = () => {
    setOpen(!open)
  }

  return (
    <div className="absolute w-[30rem] h-full z-30 rounded-md bg-white right-0">
      <div className="flex justify-between items-center px-4 py-2">
        Choose background image
        <AiOutlineCloseCircle
          className="text-xl cursor-pointer hover:text-red-600"
          onClick={handleClose}
        />
      </div>

      <form className="w-full flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          className="form-control flex-1 text-xl font-normal p-1 pl-4 bg-clip-padding border border-solid border-gray-700  transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 focus:outline-none mx-2 rounded-3xl"
          placeholder={`Try "dog" or "apple"`}
          autoFocus
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <button
          type="submit"
          className="font-bold uppercase text-sm px-2 py-1 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
          outline-blue-700
          "
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-3 space-x-2 space-y-2 overflow-y-auto h-5/6 card-list mt-2">
        {res &&
          res.map((img) => (
            <div
              key={img.id}
              className="col-span-1 cursor-pointer"
              onClick={() => {
                if (!auth.access_token) return
                setBoard({ ...board, thumbnail: img.urls.full })
              }}
            >
              {img.height > 1080 && (
                <img
                  src={img.urls.regular}
                  alt=""
                  className="w-full object-fill"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default SideBar
