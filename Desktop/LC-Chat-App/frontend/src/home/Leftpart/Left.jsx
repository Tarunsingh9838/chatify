import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'

const Left = () => {
  return (
    <div className="w-[30%]  bg-black text-gray-300 h-screen flex flex-col">
      <Search />

      <div className="flex-1 overflow-y-auto">
        <Users />
      </div>

      <div className="mt-auto">
        <Logout />
      </div>
    </div>
  )
}

export default Left