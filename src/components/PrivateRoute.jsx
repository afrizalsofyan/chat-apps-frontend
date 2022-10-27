import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({children}) => {
  const token = localStorage.getItem('chat-apps-auth-token')
  if(token) {
    return <Navigate to={'/home'} />
  }
  return children
}

const PrivateRoute = ({children}) => {
  const token = localStorage.getItem('chat-apps-auth-token')
  if(token) {
    return children
  }
  return <Navigate to={'/login'} />
}

export default PrivateRoute
