import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'

const Left = () => {
  return (
    <div className="w-full bg-[#17212b] text-gray-100 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#232e3c]">
        <h1 className="text-xl font-semibold text-white">Messages</h1>
      </div>

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


