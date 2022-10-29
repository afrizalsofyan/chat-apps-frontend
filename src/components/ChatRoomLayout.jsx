import React from 'react'
import ChatContent from './ChatContent'
import WelcomeScreen from './WelcomeScreen'

function ChatRoomLayout({currentUserData, userData}) {
  return (
    <div className='h-full'>
      {!userData ? (
        <>
          <WelcomeScreen currentUserData={currentUserData}/>
        </>
      ) : (
        <ChatContent currentChatWithUserData={userData}/>
      )}
    </div>
  )
}

export default ChatRoomLayout
