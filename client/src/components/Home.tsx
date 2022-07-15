import { AiOutlineHome } from 'react-icons/ai'
import { CgTemplate } from 'react-icons/cg'
import { FaFlipboard } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { RootStore } from '../utils/types'
import Navbar from './Navbar'

const Home = () => {
  const { auth } = useSelector((state: RootStore) => state)

  const NotUser = () => {
    return (
      <div className="grid grid-cols-3 py-48 px-28">
        <div className="col-span-2">
          <h2 className="text-5xl font-bold">
            Trello helps team move work forward.
          </h2>
          <p className="w-80 font-semibold">
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is unique -
            accomplish it all with Trello
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1603201667141-5a2d4c673378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80"
            alt=""
          />
        </div>
      </div>
    )
  }

  const User = () => {
    return (
      <div className="flex">
        <aside className="w-64 mt-8 ml-8 min-w-max" aria-label="Sidebar">
          <div className="overflow-y-auto py-4 px-3 rounded">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center p-4 text-base font-normal rounded-lg bg-gray-200 hover:bg-gray-400 hover:text-white"
                >
                  <AiOutlineHome />
                  <span className="ml-3 font-semibold">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="board"
                  className="flex items-center p-4 text-base font-normal rounded-lg bg-gray-200 hover:bg-gray-400 hover:text-white"
                >
                  <FaFlipboard />
                  <span className="ml-3 font-semibold">Boards</span>
                </Link>
              </li>
              <li>
                <Link
                  to="templates"
                  className="flex items-center p-4 text-base font-normal rounded-lg bg-gray-200 hover:bg-gray-400 hover:text-white"
                >
                  <CgTemplate />
                  <span className="ml-3 font-semibold">Templates</span>
                </Link>
              </li>

              <li>
                <Link
                  to="settings"
                  className="flex items-center p-4 text-base font-normal rounded-lg bg-gray-200 hover:bg-gray-400 hover:text-white"
                >
                  <FiSettings />
                  <span className="ml-3 font-semibold">Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <Outlet />
      </div>
    )
  }

  return (
    <div>
      <Navbar token={auth.access_token} />
      {auth.access_token ? <User /> : <NotUser />}
    </div>
  )
}

export default Home
