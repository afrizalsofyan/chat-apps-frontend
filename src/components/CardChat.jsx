import React from 'react'
import { BiUserCircle } from 'react-icons/bi'

function CardChat({data}) {
  const test = [1,2,3,4,5,6,7,8,9,10]
  return (
    <>
      {data && data.map((e, idx) => {
        return (
          <div key={'key users '+idx} className='flex gap-3 py-3 px-5 justify-between mt-1 pb-5 border-b border-white/25 cursor-pointer hover:bg-gray-600'>
            <div className='flex gap-3 h-full'>
              {!e.userPicture ? <BiUserCircle size={45} /> : <img src={`data:image/svg+xml;base64,${e.userPicture}`} alt={'photo user '+e.username} className='w-14'/>}
              <div className='flex flex-col gap-1 h-full'>
                <div className='text-sm font-semibold'>{e?.username}</div>
                <div className='text-xs font-extralight'>{e?.email}</div>
              </div>
            </div>
            <div className='text-[10px]'>01.20 AM</div>
          </div>
          // <div className='text-x'>{e?.username}</div>
        )
      })}
    </>
  )
}

export default CardChat
