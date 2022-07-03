/* eslint-disable jsx-a11y/anchor-is-valid */
import Navbar from './Navbar'
import { AiOutlineHome } from 'react-icons/ai'
import { FaFlipboard } from 'react-icons/fa'
import { CgTemplate } from 'react-icons/cg'
import { FiSettings } from 'react-icons/fi'

const home = () => {
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

  return (
    <div>
      <Navbar />
      {/* <NotUser /> */}
      <div>
        <aside className="w-64 mt-8 ml-8 " aria-label="Sidebar">
          <div className="overflow-y-auto py-4 px-3 rounded">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center p-4 text-base font-normal rounded-lg bg-gray-200"
                >
                  <AiOutlineHome />
                  <span className="ml-3 font-semibold">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-4 text-base font-normal rounded-lg bg-gray-200"
                >
                  <FaFlipboard />
                  <span className="ml-3 font-semibold">Boards</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-4 text-base font-normal rounded-lg bg-gray-200"
                >
                  <CgTemplate />
                  <span className="ml-3 font-semibold">Templates</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-4 text-base font-normal rounded-lg bg-gray-200"
                >
                  <FiSettings />
                  <span className="ml-3 font-semibold">Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default home
