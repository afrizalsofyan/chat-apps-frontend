import React from 'react'
import { BiSend } from 'react-icons/bi'
import { IoSend } from 'react-icons/io5'

function ChatContent({currentChatWithUserData}) {
  return (
    <div className='flex flex-col justify-between h-full'>
      {/* header */}
      <div className='h-[4rem] border-b flex items-center pl-5'>
        <span className=''>to: {currentChatWithUserData?.username}</span>
      </div>
      <div className='h-[69vh] md:h-[68vh]'>
        a
      </div>
      <div className='h-[3.9rem]'>
        <form className='flex w-full h-full'>
          <input name='message' type='text' placeholder='type your message' className='w-11/12 pl-5 text-teal-900 outline-none'/>
          <button className='bg-white' type='submit'><IoSend size={20} className='text-gray-800 mx-5'/></button>
        </form>
      </div>
    </div>
  )
}

export default ChatContent
