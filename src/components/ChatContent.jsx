import React from 'react'
import { IoSend } from 'react-icons/io5'
import { BsEmojiSmileFill } from 'react-icons/bs'
import EmojiPicker from 'emoji-picker-react'

function ChatContent({currentChatWithUserData, onSendMsg, chatData, ref}) {
  const [emoji, setEmoji] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const handleChange = (e) => {
    setMessage(e.target.value)
  }
  const handleChooseEmoji = (e, val) => {
    let msg = message;
    msg += val.emoji
    setMessage(msg)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(message.length >0) {
      onSendMsg(message)
      setMessage('')
    }
  }
  console.log(chatData)
  return (
    <div className='flex flex-col justify-between h-full'>
      {/* header */}
      <div className='h-[4rem] border-b flex items-center pl-5 gap-3'>
        <span className=''>to: {currentChatWithUserData?.username}</span>
        <img src={`data:image/svg+xml;base64,${currentChatWithUserData.userPicture}`} alt={currentChatWithUserData?.username+'-img'} className='w-8' />
      </div>
      <div className='h-[69vh] md:h-[68vh] flex flex-col gap-4 overflow-auto px-4 pt-4'>
        {chatData.map((e, i) => {
          return(
            <div className='w-full' ref={ref} key={'key index '+i}>
              <div className={`flex items-center ${e.fromSelf ? 'justify-end' : 'justify-start'}`}>
                <div className='max-w-[45%] break-words p-3 bg-blue-900 rounded-xl'>
                  <span className='text-sm'>{e.message}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='h-[3.9rem]'>
        <form className='flex w-full h-full' onSubmit={handleSubmit}>
          <div className='bg-white h-full pl-3 flex items-center' onClick={()=>setEmoji(!emoji)}>
            <BsEmojiSmileFill size={25} className='text-yellow-500 hover:text-orange-700' />
            {emoji ? (
              <div className='absolute bottom-[100px] xl:bottom-[50px]'>
                <EmojiPicker onEmojiClick={handleChooseEmoji} height='23em' width={'20em'} pickerStyle={{boxShadow: 'none'}} disableSearchBar />
              </div>
            ) : null}
          </div>
          <input name='message' type='text' placeholder='type your message' className='w-11/12 pl-5 text-teal-900 outline-none' value={message} onChange={handleChange}/>
          <button className='bg-white' type='submit'><IoSend size={20} className='text-gray-800 mx-5'/></button>
        </form>
      </div>
    </div>
  )
}

export default ChatContent
