import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CardChat from '../components/CardChat'
import http from '../helpers/http'
import {IoSearch} from 'react-icons/io5'
import { BiCog } from 'react-icons/bi'
import ChatRoomLayout from '../components/ChatRoomLayout'
import {io} from 'socket.io-client'

function Home() {
  const navigation = useNavigate()
  const socket = React.useRef()
  const [users, setUsers] = React.useState([])
  const [currentUser, setCurentUser] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [indexChatUser, setIndexChatUser] = React.useState()
  const [selectedUser, setSelectedUser] = React.useState()
  const [showModal, setShowModal] = React.useState(false)

  const getCurrentUser = async () => {
    try {
      const {data} = await http().get('/currentUser')
      setCurentUser(data.results)

    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const handleScroll = (e) => {
    const bottomReach = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight 
    if(bottomReach) {
      console.log('this scroll to bottom')
    }
  }

  React.useEffect(()=> {
    setLoading(true)
    getCurrentUser()
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  },[])

  const getAllUsers = async () => {
    try {
      const {data} = await http().get('/all-users')
      setUsers(data.results)
      if(currentUser){
        if(!currentUser.pictureSet){
          navigation('/profile/edit')
        }
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const handleClickChat = (user, idx) => {
    setSelectedUser(user)
    setIndexChatUser(idx)
  }
  
  const onLogout = async() => {
    localStorage.removeItem('chat-apps-auth-token')
    navigation('/login')
  }

  React.useEffect(() => {
    if(currentUser!==undefined){
      getAllUsers()
    }
  }, [currentUser])
  React.useEffect(()=>{
    if(currentUser){
      socket.current = io('http://localhost:4000')
      socket.current.emit('add-user', currentUser.id)
    }
  },[currentUser])
  return (
    // <button onClick={getCurrentUser}>get data</button>
    <>
      <section className='w-full min-h-screen bg-gray-900 flex flex-col items-center justify-center'>
        <div className="text-white grid grid-cols-3 w-full container py-10 min-h-screen">
          <div className='py-5 bg-gray-700 rounded-tl-lg rounded-bl-lg w-full'>
            <div className='flex flex-col'>
              {!loading ? (
                <>
                  <div>
                    <div className='flex justify-between items-center mb-5 px-5'>
                      <span className='text-base font-semibold'>All Your chats</span>
                      <IoSearch size={20} />
                    </div>
                    <div className='pb-2 h-[60vh] overflow-auto contact-list' onScroll={handleScroll}>
                      <CardChat data={users} onClickChat={handleClickChat} indexActive={indexChatUser} />
                    </div>
                  </div>
                  <div className='flex justify-between items-center px-5 h-50 pt-5 w-full'>
                    <div className='flex gap-4 items-center'>
                      {currentUser?<img src={`data:image/svg+xml;base64,${currentUser?.picture}`} className='w-14' alt={`img ${currentUser?.username}`} /> : null}
                      <span className='text-base font-semibold'>{currentUser?.username}</span>
                      {showModal ? (
                        <div className='absolute bg-white text-teal-800 w-1/6 ml-16 mb-28 lg:w-1/5 py-3 lg:ml-24 lg:mb-28 xl:ml-28 rounded-md'>
                          <div className='flex flex-col items-start justify-center gap-2'>
                            <Link to={'#'} className='pl-3 font-semibold text-sm hover:text-teal-600'>My Account</Link>
                            <span className='pl-3 font-semibold text-sm hover:text-teal-600 cursor-pointer' onClick={onLogout}>Logout</span>
                          </div>
                      </div>
                      ) : null}
                    </div>
                    <BiCog size={25} className='hover:transition hover:rotate-180 cursor-pointer before:-rotate-180' onClick={()=>setShowModal(!showModal)}/>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                  <span>Loading</span>
                </div>
              )}
            </div>
          </div>
          <div className={`col-span-2 bg-gray-800 rounded-tr-lg rounded-br-lg ${indexChatUser < 0 ? 'flex flex-col justify-center items-center' : ''}`}>
            <ChatRoomLayout currentUserData={currentUser} userData={selectedUser} socket={socket}/>
            {/* <div className=''>
            </div> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
