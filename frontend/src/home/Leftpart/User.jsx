import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext.jsx';

const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

function User({ user }) {
  if (!user) return null;

  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user?._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`cursor-pointer transition-colors duration-150 ${isSelected ? 'bg-[#2b5278]' : 'hover:bg-[#202b36]'
        }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center gap-3 px-4 py-2">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={`https://ui-avatars.com/api/?name=${user.fullname}&background=5288c1&color=fff&size=128`}
              className="object-cover w-full h-full"
              alt="avatar"
            />
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#4dcd5e] rounded-full border-2 border-[#17212b]"></span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-medium truncate">{user.fullname}</h2>
            {user.lastMessageTime && (
              <span className="text-xs text-[#6c7883]">{formatTime(user.lastMessageTime)}</span>
            )}
          </div>
          <p className="text-[#6c7883] text-sm truncate">
            {user.lastMessage || (isOnline ? <span className="text-[#4dcd5e]">online</span> : 'Tap to chat')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default User;
