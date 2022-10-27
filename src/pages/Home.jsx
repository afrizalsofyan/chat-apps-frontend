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
    getCurrentUser()
  }, [])
  return (
    // <button onClick={getCurrentUser}>get data</button>
    <>
      <section className='w-full min-h-screen bg-gray-800 flex flex-col items-center justify-center'>
        <div className="text-white grid grid-cols-3 w-full container gap-5 h-[86vh]">
          <div className='p-5 bg-gray-700 rounded-lg'>1</div>
          <div className='p-5 col-span-2 bg-gray-700 rounded-lg'>2</div>
        </div>
      </section>
    </>
  )
}

export default Home
