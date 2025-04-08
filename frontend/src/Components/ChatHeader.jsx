import React from 'react'
import { UseAuthStore } from '../Store/UseAuthStore'
import { UseChatStore } from '../Store/UseChatStore'
import avatar from "../assets/avatar.png"
import { X } from 'lucide-react'

const ChatHeader = () => {
    const {onlineUsers} = UseAuthStore()
    const {setSelectedUser ,selectedUser} = UseChatStore()

  return (
    <div className='border-b p-2.5 border-base-300'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3 '>
                {/* Avatar */}
                <div className='avatar'>
                    <div className='size-10 rounded-full relative'>
                        <img src={selectedUser.profilePic || avatar } alt="" />
                    </div>
                </div>
                {/* User Info */}
                <div className='font-medium'>
                    <h3 className='font-medium'>{selectedUser.fullName}</h3>
                    <p className='text-sm text-base-content/70'>{onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}</p>
                </div>

            </div>
                {/* Close Button */}
                <button onClick={()=> setSelectedUser(null)}>
                    <X/>
                </button>

        </div>
      
    </div>
  )
}

export default ChatHeader
