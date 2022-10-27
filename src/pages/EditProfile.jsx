import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Buffer} from 'buffer'
import toast from 'react-hot-toast'
import http from '../helpers/http'

function EditProfile() {
  const navigation = useNavigate()
  const pictGeneratorAPI = 'https://api.multiavatar.com/45678945'
  const [picture, setPicture] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pict, setPict] = React.useState()

  const onPickPicture = async () => {
    if(pict === undefined) {
      toast.error('You must choose an avatar')
    }
    setLoading(true)
    try {
      const localStore = {}
      const {data} = await http().post('/avatar-profile', {
        userPicture: picture[pict]
      })
      if(data?.results?.isPictureSet) {
        localStore.isAvatar = data?.results?.isPictureSet
        localStore.picture=data?.results?.userPicture
        localStorage.setItem('chat-apps-user-data', JSON.stringify(localStore))
        navigation('/home')
      } else {
        toast.error('error to set avatar. try again')
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    const getDefaultAvatar = async () => {
      const data=[]
      try {
        for(let i=0; i<4; i++) {
          const image = await axios.get(`${pictGeneratorAPI}/${Math.round(Math.random() * 1000)}`)
          const buffer = new Buffer(image.data)
          data.push(buffer.toString("base64"))
        }
        setPicture(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getDefaultAvatar()
  }, [])
  return (
    <>
      {loading ? (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        <span>Loading</span>
      </div>) : (
        <>
          <div className='container flex flex-col items-center justify-center gap-10 min-h-screen'>
            <div className='text-4xl font-bold'><span>Pick your picture</span></div>
            <div className='flex items-center justify-center gap-5'>
              {
                picture.map((el, idx) => {
                  return (
                    <div key={'key '+idx} className={`${pict === idx ? 'border-4 border-teal-500 rounded-full' : ''} flex w-16`}>
                      <img src={`data:image/svg+xml;base64,${el}`} alt='default_picture' onClick={() => setPict(idx)} className='transition duration-500 ease-in-out' />
                    </div>
                  )
                })
              }
            </div>
            <button className='mt-7 rounded-xl transition-all duration-700 bg-gradient-to-r from-blue-700 to-cyan-500 hover:bg-gradient-to-r hover:via-blue-700 hover:from-cyan-500 hover:to-blue-700 bg-size-200 bg-position-0 hover:bg-position-100 py-5 mx-10 text-xl font-bold text-white px-20' onClick={onPickPicture}>Pick this avatar</button>
          </div>
        </>
      )
      }
    </>
  )
}

export default EditProfile
