import React from 'react'
import http from '../helpers/http'
import ChatContent from './ChatContent'
import WelcomeScreen from './WelcomeScreen'

function ChatRoomLayout({currentUserData, userData, socket}) {

  const [dataMsg, setDataMsg] = React.useState([])
  const [arrivalMsg, setArrivalMsg] = React.useState(null)
  const scrollRef = React.useRef()

  const fetchChatMessage = async () => {
    try {
      const {data} = await http().post('/message/all-message', {
        sender: currentUserData.id,
        recipient: userData?._id
      })
      if(data?.results) {
        setDataMsg(data.results)
      } else {
        setDataMsg([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSendMsg = async (msg) => {
    try {
      await http().post('/message/send-msg', {
        sender: currentUserData.id,
        recipient: userData?._id,
        message: msg
      })
      socket.current.emit('send-msg', {
        sender: currentUserData.id,
        recipient: userData._id,
        message: msg
      })

      const messages = [...dataMsg]
      messages.push({fromSelf: true, message: msg})
      setDataMsg(messages)
    } catch (error) {
      console.log(error)
    }
  }
  //can split to 2 useeffect
  React.useEffect(()=> {
    if(userData){
      fetchChatMessage()
    }
    if(socket.current) {
      socket.current.on('msg-recieve', (msg) =>{
        setArrivalMsg({fromSelf: false, message: msg})
      })
    }
  }, [userData, socket])

  React.useEffect(()=> {
    arrivalMsg && setDataMsg((prev) => [...prev, arrivalMsg])
  }, [arrivalMsg])

  React.useEffect(()=> {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [dataMsg])
  return (
    <div className='h-full'>
      {!userData ? (
        <>
          <WelcomeScreen currentUserData={currentUserData}/>
        </>
      ) : (
        <ChatContent currentChatWithUserData={userData} onSendMsg={handleSendMsg} chatData={dataMsg} ref={scrollRef}/>
      )}
    </div>
  )
}

export default ChatRoomLayout
