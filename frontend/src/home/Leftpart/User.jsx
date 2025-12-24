import React from 'react'

const User = ({
    name = 'Gordon Ramsey',
    subtitle = 'akhil@hmail.com',
    message = 'Hey, are you there?',
    time = '2:45 PM',
    unread = 0,
    avatar = 'https://img.daisyui.com/images/profile/demo/gordon@192.webp',
}) => {
    return (
        <div>
            <div className="flex items-center gap-4 px-4 py-3 hover:bg-gray-700 cursor-pointer">
                <div className="avatar avatar-online">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={avatar} className="object-cover w-full h-full" />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <h2 className="text-white font-medium truncate">{name}</h2>
                        <div className="text-xs text-gray-400 ml-2">{time}</div>
                    </div>
                    <div className="text-gray-400 text-sm truncate">{message}</div>
                </div>

                {unread > 0 && (
                    <div className="ml-3">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{unread}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default User