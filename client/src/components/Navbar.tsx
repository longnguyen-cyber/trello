import React, { useState } from 'react'
import { CgListTree } from 'react-icons/cg'
import { BiLogIn } from 'react-icons/bi'

const Navbar = () => {
  const [user, setUser] = useState(true)
  return (
    <>
      <div className="flex justify-between p-4 shadow-lg">
        <div className="flex items-center ">
          <CgListTree className="text-4xl mx-4 text-white bg-blue-600 p-1" />
          <h1 className="font-bold text-4xl">Trello</h1>
        </div>
        {user ? (
          <div className="mr-4">
            <button className="text-3xl font-semibold">
              <BiLogIn />
            </button>
          </div>
        ) : (
          <div className="mr-4">
            <button className="px-4 py-2 text-blue-400 font-semibold">
              Log in
            </button>
            <button className="px-4 py-2 text-white font-semibold bg-green-600 rounded-md">
              Sign up
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
