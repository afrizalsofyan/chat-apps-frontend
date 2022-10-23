import React from 'react'
import http from '../helpers/http'

function Home() {
  const getCurrentUser = async () => {
    try {
      const {data} = await http().get('/currentUser')
      console.log(data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  React.useEffect(() => {
  }, [])
  return (
    <button onClick={getCurrentUser}>get data</button>
  )
}

export default Home