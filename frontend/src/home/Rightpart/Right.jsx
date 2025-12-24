import React from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './Typesend'

const Right = () => {
  return (
    <div className="flex-1 h-screen flex flex-col bg-gray-900 text-gray-200">
      <Chatuser />

      <div className="flex-1 overflow-y-auto">
        <Messages />
      </div>

      <div className="sticky bottom-0 bg-gray-900">
        <Typesend />
      </div>
    </div>
  )
}

export default Right