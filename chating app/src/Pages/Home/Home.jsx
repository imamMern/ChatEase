import React, { useEffect, useState } from 'react'
import verificationImage from '/src/assets/email confirmation.png'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Sidebar from '../../components/Sidebar/Sidebar'
import GroupList from '../../components/GroupList/GroupList';


const Home = () => {
  const auth = getAuth();
  const data = useSelector(state => state.userLoginInfo.UserInfo);
  const navigate = useNavigate()
  const [verify,setVerify] = useState(false)

  console.log(data);
  useEffect(()=>{
    if(!data){
      navigate('/')
    }
  }, [])

  onAuthStateChanged(auth, (user) => {
  if(user.emailVerified){
    setVerify('true')
  }
  });

  return (
    <div>
     {
        verify ?
        <div className='flex mt-[33px] mb-[35px] ml-[32px] mr-[23px]'>
            <div className='w-[186px]'>
              <Sidebar/>
            </div>
            <div className='w-[427px]'>
              <GroupList/>
            </div>
            <div className='w-[344px]'></div>
            <div className='w-[344px]'></div>
        </div>
        :
          <div className='bg-white shadow-lg p-8 rounded-lg absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4'>
            <div className='flex flex-col items-center'>
            <img className='w-1/2 h-1/2' src={verificationImage} alt="" />
            <p className='font-semibold text-[36px] font-pop text-[#333333]'>Verify your email!</p>
            <p className='mt-2 mb-4 text-[18px] font-normal font-pop text-[#6D6782]'>We sent you a verification link via email. Please click it to verify your email address.</p>
            <button className='bg-brand py-3 px-12 mt-3 mb-2 rounded-md text-white font-open font-medium text-[18px]'> <Link to='/login'> Back to Login</Link> </button>
            </div>
          </div>

     }
    </div>
  )
}

export default Home