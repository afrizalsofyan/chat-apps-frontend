import React from 'react'
import { BiUserCircle } from 'react-icons/bi'

function CardChat({data, onClickChat, indexActive}) {
  return (
    <>
      {data && data.map((e, idx) => {
        return (
          <div key={'key users '+idx} className={`flex py-3 px-5 justify-between pb-5 border-b border-white/25 cursor-pointer hover:bg-gray-600 ${indexActive === idx ? 'bg-gray-600' : ''}`} onClick={()=>onClickChat(e, idx)}>
            <div className='flex gap-3 h-full w-3/4'>
              {!e.userPicture ? <BiUserCircle size={40} className='w-10' /> : <img src={`data:image/svg+xml;base64,${e.userPicture}`} alt={'photo user '+e.username} className='w-10'/>}
              <div className='flex flex-col gap-1 h-full w-full'>
                <span className='text-sm font-semibold truncate'>{e?.username}</span>
                <span className='text-xs font-extralight truncate'>{e?.email}</span>
              </div>
            </div>
            <div className='text-[10px] w-1/4 truncate text-end'>01.20 AM</div>
          </div>
          // <div className='text-x'>{e?.username}</div>
        )
      })}
    </>
  )
}

export default CardChat
