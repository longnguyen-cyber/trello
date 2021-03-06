import { FcStackOfPhotos } from 'react-icons/fc'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FormSubmit, IModal, InputChange, RootStore } from '../utils/types'
import { Tooltip } from './Tooltip'
interface IProps {
  content?: string
  showModal: boolean
  setShowModal: (showModal: boolean) => void
  body?: IModal
  setBody?: (body: IModal) => void
  board?: string
  column?: string
  callback: (body: IModal, token: string) => void
}
export default function Modal({
  content,
  callback,
  body,
  setBody,
  showModal,
  setShowModal,
  board,
  column
}: IProps) {
  const { id } = useParams()
  const handleChangeImg = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (!body || !setBody) return
    if (files) {
      const file = files[0]
      if (!setBody) return
      setBody({ ...body, thumbnail: file })
    }
  }

  const handleInputChange = (e: InputChange) => {
    const { name, value } = e.target
    if (!body || !setBody) return
    setBody({ ...body, [name]: value })
  }

  const { auth } = useSelector((state: RootStore) => state)
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (!body || !setBody) return
    if (!auth.access_token) return
    callback({ ...body, title: body.title }, auth.access_token)

    setShowModal(!showModal)
    setBody({
      title: '',
      thumbnail: ''
    })
  }

  const handleCancel = () => {
    setShowModal(!showModal)
    if (!body || !setBody) return

    setBody({
      title: '',
      thumbnail: ''
    })
  }

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <form
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                onSubmit={handleSubmit}
              >
                {/*header*/}
                {/*body*/}
                <div className="relative px-6 flex-auto">
                  <div style={{ width: '60rem' }}>
                    <div className="my-4 flex space-x-2 items-center">
                      <input
                        type="text"
                        className={`form-control block w-full px-4 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                          body &&
                          (body.title.length < 10 || body.title.length > 20)
                            ? 'border-red-600'
                            : 'border-green-600'
                        }`}
                        placeholder="Add title"
                        name="title"
                        autoComplete="username"
                        value={body?.title}
                        onChange={handleInputChange}
                      />
                      <h3
                        className={`font-semibold ${
                          body &&
                          (body.title.length < 10 || body.title.length > 20)
                            ? 'text-red-600'
                            : 'text-green-600'
                        }`}
                      >
                        {body?.title.length}/10
                      </h3>
                      <Tooltip message="choose image you like">
                        <label htmlFor="file" className="cursor-pointer">
                          <FcStackOfPhotos className="w-6 h-6" />
                          <input
                            id="file"
                            type="file"
                            accept=".png, .jpeg, .jpg"
                            className="hidden"
                            placeholder="Add title"
                            name="account"
                            autoComplete="username"
                            onChange={handleChangeImg}
                          />
                        </label>
                      </Tooltip>
                    </div>
                  </div>
                  <div>
                    {body?.thumbnail && (
                      <div
                        className="relative board
                        } cursor-pointer before:h-96"
                      >
                        <img
                          src={
                            typeof body.thumbnail !== 'string'
                              ? URL.createObjectURL(body.thumbnail)
                              : body.thumbnail
                          }
                          className="w-full h-96"
                          alt="thumbnail"
                          style={{ objectFit: 'cover' }}
                        />

                        <div
                          className="absolute top-2/4 left-2/4 text-white font-semibold text-2xl"
                          style={{ transform: 'translate(-50%,-50%)' }}
                        >
                          <h3>{body.title}</h3>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {id
                      ? board && column
                        ? 'Update card'
                        : 'Add card'
                      : 'Add board'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
