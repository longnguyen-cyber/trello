import { BiLogIn } from 'react-icons/bi'
import { CgListTree } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/actions/authAction'
import { RootStore, TypedDispatch } from '../utils/types'

interface IProps {
  token?: string
}

const Navbar = ({ token }: IProps) => {
  const navigate = useNavigate()
  const { auth } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch<TypedDispatch>()
  const handleLogout = () => {
    if (!auth.access_token) return
    dispatch(logout(auth.access_token))
  }
  return (
    <>
      <div className="flex justify-between p-4 shadow-lg">
        <div className="flex items-center ">
          <CgListTree className="text-4xl mx-4 text-white bg-blue-600 p-1" />
          <h1 className="font-bold text-4xl">Trello</h1>
        </div>
        {token ? (
          <div className="mr-4">
            <button className="text-3xl font-semibold">
              <BiLogIn onClick={handleLogout} />
            </button>
          </div>
        ) : (
          <div className="mr-4">
            <button
              className="px-4 py-2 text-blue-400 font-semibold"
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
            <button
              className="px-4 py-2 text-white font-semibold bg-green-600 rounded-md"
              onClick={() => navigate('/sign-up')}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
