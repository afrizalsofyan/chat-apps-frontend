import React from 'react'
import { useNavigate } from 'react-router-dom'
import CardChat from '../components/CardChat'
import http from '../helpers/http'
import {IoSearch} from 'react-icons/io5'
import { BiCog } from 'react-icons/bi'

function Home() {
  const navigation = useNavigate()
  const [users, setUsers] = React.useState([])
  const [currentUser, setCurentUser] = React.useState()
  const [loading, setLoading] = React.useState(false)
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
  React.useEffect(() => {
    if(currentUser!==undefined){
      getAllUsers()
    }
  }, [currentUser])
  console.log(currentUser)
  return (
    // <button onClick={getCurrentUser}>get data</button>
    <>
      <section className='w-full min-h-screen bg-gray-900 flex flex-col items-center justify-center'>
        <div className="text-white grid grid-cols-3 w-full container h-[86vh]">
          <div className='py-5 bg-gray-700 rounded-tl-lg rounded-bl-lg w-full'>
            <div className='flex flex-col'>
              {!loading ? (
                <>
                  <div>
                    <div className='flex justify-between items-center mb-5 px-5'>
                      <span className='text-base font-semibold'>All Your chats</span>
                      <IoSearch size={20} />
                    </div>
                    <div className='pb-5 h-96 overflow-auto contact-list' onScroll={handleScroll}>
                      <CardChat data={users} />
                    </div>
                  </div>
                  <div className='flex justify-between items-center px-5 h-50 pt-5'>
                    <div className='flex gap-4 items-center'>
                      <img src={`data:image/svg+xml;base64,${currentUser?.picture}`} className='w-14' alt={`img ${currentUser?.username}`} />
                      <span className='text-base font-semibold'>{currentUser?.username}</span>
                    </div>
                    <BiCog size={25}/>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                  <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                  <span>Loading</span>
                </div>
              )}
            </div>
          </div>
          <div className='p-5 col-span-2 bg-gray-800 rounded-tr-lg rounded-br-lg'>2</div>
        </div>
      </section>
    </>
  )
}

export default Home
