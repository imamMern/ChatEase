import React, { useState } from 'react'
import { LuKey } from 'react-icons/lu'
import { BsArrowLeftShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const ForgotPassword = () => {

 const auth = getAuth();

// Usestate for email
  const [email, setEmail] = useState('')
  const [emailError, setemailError] = useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setemailError('')
  }
  const handleForgotClick = () =>{
    if(!email){
        setemailError('Enter an email address');
      }
      else{
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          setemailError('Please enter a valid email address');
        }
      }

      if(email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ){
        sendPasswordResetEmail(auth, email)
        .then(() => {
        })
        .catch((error) => {
          const errorCode = error.code;
        });
      }
  }

  return (
    <div>
        <div className='w-full h-screen bg-white'>
              <div className='flex flex-col justify-center items-center mt-[50px]'>
                    <div className=' p-4 rounded-full bg-[#F2EEFF] shadow-md' >
                        <div className=' p-3 rounded-full bg-[#DBD2FD]'>
                          <LuKey className='text-brand text-[30px]'/>
                        </div>
                    </div>
                    <h3 className='mt-8 font-semibold text-[36px] font-pop text-[#333333]'>Forgot Password?</h3>
                    <p className='mt-2 text-[18px] font-normal font-pop text-[#6D6782]'>No worries, we'll send you reset instructions. </p>
                    <div className='w-[20%] flex flex-col justify-center ' >

                      {/* Email address Input */}

                      <p className={`mt-8 mb-1 text-[14px] font-normal font-pop text-[#333333]' ${emailError ? 'text-[#B44242]' : ''}`}>{emailError ? emailError : 'Email'}</p>

                      <input className= {emailError ? 'py-2 px-8 border-2 border-red-500 rounded-md outline-none placeholder:font-open placeholder:font-medium' : 'py-2 px-8 border-2 border-bor/30 rounded-md outline-none placeholder:font-open placeholder:font-medium'} type='mail' placeholder='Enter your mail' onChange={handleEmail}/>

                      <button className='bg-brand py-3 mt-10 mb-2 rounded-md text-white font-open font-medium text-[18px]' onClick={handleForgotClick}>Reset Password</button>

                      <button className='flex justify-center items-center py-3 font-open text-[16px] font-medium text-[#333333] '> <BsArrowLeftShort className='text-[28px]'/> <Link to='/login'> Back to Login</Link> </button>
                    </div>
              </div>

          </div>
    </div>
  )
}

export default ForgotPassword