import React from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import http from '../helpers/http'

function Login() {
  const navigation = useNavigate()
  const valObj = {
    email: '', 
    password: ''
  }
  const [values, setValues] = React.useState(valObj)
  const onSubmit = async (e) => {
    e.preventDefault()
    if(validation()) {
      try {
        const {data} = await http().post('/login', {...values})
        localStorage.setItem('chat-apps-auth-token', data.results.token)
        navigation('/home')
      } catch (error) {
        console.log(error)
        if(error && error.response?.data.success === false) {
          toast.error('Something wrong\n'+ error.response.data.message)
        }
      }
    }
  }
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }
  const validation = () => {
    const {email, password} = values

    if(email && password) {
      if(password.length < 6) {
        toast.error('Password must be grather or equal with 6 characters')
        return false
      }
      return true
    } else {
      toast.error('Fields is required, please fill all fields!!!')
      return false
    }
  }
  return (
    <div className='bg-gray-800 flex justify-center items-center min-h-screen'>
        <form onSubmit={onSubmit} className='flex flex-col bg-white w-1/3 gap-5 rounded-lg my-20'>
            <span className='font-semibold text-3xl text-center mt-10 mb-5'>Login to your account</span>
            <input type='email' name='email' onChange={(e)=>handleChange(e)} placeholder='email' className='p-4 mx-5 border-b-2 border-black focus:outline-none' />
            <input type='password' name='password' onChange={(e)=>handleChange(e)} placeholder='password' className='p-4 mx-5 border-b-2 border-black focus:outline-none' />
            <button type='submit' className='mt-20 rounded-xl transition-all duration-700 bg-gradient-to-r from-yellow-600 to-amber-500 hover:bg-gradient-to-r hover:from-amber-500 hover:via-yellow-500 hover:to-yellow-600 bg-size-200 bg-position-0 hover:bg-position-100 py-5 mx-10 text-xl font-bold text-white'>Login</button>
            <span className='text-center py-5 mb-4'>Don't have account ? <Link to={'/'} className='hover:font-bold hover:text-cyan-800'>Register Now</Link> </span>
        </form>
    </div>
  )
}

export default Login
