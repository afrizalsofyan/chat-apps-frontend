import React from 'react'
import HiRobotGif from '../assets/hi-robot.gif'

function WelcomeScreen({currentUserData}) {
  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      <img src={HiRobotGif} alt='img-welcome' className='w-56' />
      {currentUserData ? 
        (
          <span className='text-center text-xl font-bold'>Hi
            <span className='text-yellow-500'>{` ${currentUserData?.username}`}<br/></span>
            <span className='text-base font-light'>Please choose user for the starting message.</span>
          </span>
        ) : null 
      }
    </div>
  )
}

export default WelcomeScreen
