import React from 'react'
import profile from '/src/assets/pp.png'
import { LiaHomeSolid } from 'react-icons/lia'
import { PiChatTeardropDotsFill } from 'react-icons/pi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { AiOutlineSetting } from 'react-icons/ai'
import { RiLogoutBoxRLine } from 'react-icons/ri'

const Sidebar = () => {
  return (
    <div className='bg-brand rounded-lg py-[38px]'>
        <img className='mx-auto' src={profile} alt="" />
        <div className='flex flex-col gap-[82px] mt-[98px] mb-[187px]'>
        <div className='after:absolute relative py-[20px] after:content-[" "] after:w-full after:h-full after:top-0 after:left-[25px] after:bg-white after:z-[-1] z-[1] overflow-hidden after:rounded-t-[20px] after:rounded-b-[20px] before:absolute before:content-[" "] before:w-[8px] before:h-full before:top-0 before:right-0 before:bg-brand  before:shadow-lg '>
            <LiaHomeSolid className='mx-auto text-5xl text-brand '/>
        </div>
        <PiChatTeardropDotsFill className='mx-auto text-5xl text-white/70'/>
        <IoMdNotificationsOutline className='mx-auto text-5xl text-white/70'/>
        <AiOutlineSetting className='mx-auto text-5xl text-white/70'/>
        </div>
        <RiLogoutBoxRLine className='mx-auto text-5xl text-white shadow-lg'/>

    </div>
  )
}

export default Sidebar