import React from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import http from '../helpers/http'

function Register() {
  const navigation = useNavigate()
  const valObj = {username: '', email: '', password: '', repeatPassword: ''}
  const [values, setValues] = React.useState(valObj)
  const onSubmit = async (e) => {
    e.preventDefault()
    if(validation()) {
      const reqParams = {username: values.username,email: values.email,password: values.password}
      const {data} = await http().post('/register', {...reqParams})
      if(data.success === false) {
        toast.error('Something error, ', data.message)
      }
      navigation('/login')
    }
  }
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }
  const validation = () => {
    const {username, password, repeatPassword, email} = values;
    if(username && password && repeatPassword && email) {
      if(password !== repeatPassword) {
        toast.error('Confirm password doesn\'t match')
        return false
      }
      if(username.length < 5) {
        toast.error('Username must be grather or equal with 5 characters')
        return false
      }
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
        <div className='w-1/3'>
          <form onSubmit={onSubmit} className='flex flex-col bg-white gap-5 rounded-lg my-20'>
              <span className='font-semibold text-3xl text-center mt-10 mb-5'>Create your account now</span>
              <input type='email' name='email' onChange={(e)=>handleChange(e)} placeholder='email' className='p-4 mx-5 color-black border-b-2 border-black focus:outline-none' />
              <input type='text' name='username' onChange={(e)=>handleChange(e)} placeholder='username' className='p-4 mx-5 color-black border-b-2 border-black focus:outline-none' />
              <input type='password' name='password' onChange={(e)=>handleChange(e)} placeholder='password' className='p-4 mx-5 color-black border-b-2 border-black focus:outline-none' />
              <input type='password' name='repeatPassword' onChange={(e)=>handleChange(e)} placeholder='reapeat password' className='p-4 mx-5 color-black border-b-2 border-black focus:outline-none' />
              <button type='submit' className='mt-20 rounded-xl transition-all duration-700 bg-gradient-to-r from-blue-700 to-cyan-500 hover:bg-gradient-to-r hover:via-blue-700 hover:from-cyan-500 hover:to-blue-700 bg-size-200 bg-position-0 hover:bg-position-100 py-5 mx-10 text-xl font-bold text-white'>Register</button>
              <span className='text-center py-5 mb-4'>Have account ? <Link to={'/login'} className='hover:font-bold hover:text-cyan-800'>Login Now</Link> </span>
          </form>
          {/* <span>OR</span>
          <button onClick={()=>signIn('google')}>Google</button> */}
        </div>
    </div>
  )
}

export default Register