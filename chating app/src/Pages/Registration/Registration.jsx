import React, { useState } from 'react'
import LoginImage from '/src/assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { BsEyeFill } from 'react-icons/bs'
import { BsEyeSlashFill} from 'react-icons/bs'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';


const Registration = () => {

  // Firebase Authentication variable
  const auth = getAuth();

  // Navigate Hook import
  const navigate = useNavigate('')

  // Usestate for email
  const [email, setEmail] = useState('')
  const [emailError, setemailError] = useState('')

  // Usestate for Fullname
  const [fullName, setfullName] = useState('')
  const [fullNamelError, setfullNameError] = useState('')

  //Usestate for password
  const [password, setpassword] = useState('')
  const [passwordError, setpasswordError] = useState('')

  // Usestate For Password eye Icon
  const [showPassword, setshowPassword] = useState('')

  // Usestate for Signup Done
  const [signUpDone, setSignUpDone] = useState('')

  // Usestate for already used mail
  const [usedMail , setUsedMail] = useState('')

  const handleEmail = (e) =>{
    setEmail(e.target.value);
    setemailError('')
  }

  const handleFullName = (e) =>{
    setfullName(e.target.value);
    setfullNameError('')
  }
  const handlePassword = (e) =>{
    setpassword(e.target.value);
    setpasswordError('')
  }

  const handleClick = (e) => {
    // Error if email input field blank
      if(!email){
        setemailError('Enter an email address');
      }
      // Email valiadation Condition
      else{
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          setemailError('Please enter a valid email address');
        }
      }
      // Error if full name input field is empty
      if(!fullName){
        setfullNameError('Enter your fullname');
      }

      // Error if password input field is empty
      if(!password){
        setpasswordError('Enter a password');
      }
      // Strong password condition
      else if(!/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.{6,})/.test(password)){
          setpasswordError('Use Uppercase, Lowercase, number and min 6 characters ');
        }

        if (email && fullName && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  toast.success('Registration Successful. Please verify your mail');
                  setEmail('');
                  setfullName('');
                  setpassword('');
                  setTimeout(() => {
                    navigate('/login');
                  }, 2000);
                });
            })
            .catch((error) => {
              const errorCode = error.code;
              if (errorCode.includes('auth/email-already-in-use')) {
                setUsedMail('Email already in use');
              }
            });
        }

    }

  return (
    <div className='flex'>
          <div className='flex w-1/2 justify-end'>
            <div className='mr-[69px] mt-[225px] mb-[117px] mr-[69px]'>

                {/* Heading and Text */}
                <h2 className='font-open text-[34px] text-[#11175D] font-bold mb-[13px]'>Get started with easily register</h2>
                <p className='font-open text-xl text-[#000000]/[0.5] font-normal mb-[40px]'>Free register <span className='font-open text-xl text-[#808080]/[0.5] font-normal mb-[40px]'> and</span> you can enjoy it</p>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    />

                {/* Input field For Email */}
                <div className='relative w-80 mb-[35px] '>
                  <input className={emailError ? 'border-2 border-bor/[0.3] outline-none font-open text-base px-12 py-4 text-[#000000] w-full rounded-lg border-red-500':'border-2 border-bor/[0.3] outline-none font-open text-base px-12 py-4 text-[#000000] w-full rounded-lg'}  type="mail" placeholder='enter your mail' onChange={handleEmail} value={email} />
                  <p className={`absolute top-[-23px] left-[33PX] font-open text-sm text-[#11175D] bg-white px-4 py-3 ${emailError ? 'text-[#B44242]' : ''}`}>{emailError ? emailError : 'Email Address'}</p>
                  {
                      usedMail &&
                      <p className='font-open text-sm text-[#B44242] bg-[#F8D7D7] px-4 py-2 mt-2 rounded'>{usedMail}</p>
                  }

                </div>


                {/* Input field For Fullname */}
                <div className='relative w-80 mb-[35px] '>
                  <input className={fullNamelError ? ' border-2 border-bor/[0.3] outline-none font-open text-base px-12 py-4 text-[#000000] w-full rounded-lg border-red-500' : ' border-2 border-bor/[0.3] outline-none font-open text-base px-12 py-4 text-[#000000] w-full rounded-lg'} type="name" placeholder='enter your name' onChange={handleFullName} value={fullName} />
                  <p className={`absolute top-[-23px] left-[33PX] font-open text-sm text-[#11175D] bg-white px-4 py-3 ${fullNamelError ? 'text-[#B44242]' : ''}`}>{fullNamelError ? fullNamelError : 'Fullname'}</p>
                </div>

                {/* Input field For Password */}
                <div className='relative w-80 mb-[50px]'>
                  <input className={passwordError ? ' border-2 border-bor/[0.3] outline-none font-open text-base px-12 py-4 text-[#000000] w-full rounded-lg border-red-500': 'border-2 border-bor/[0.3] outline-none font-open text-base px-12 py-4 text-[#000000] w-full rounded-lg'} type={showPassword ? 'text' : 'password'} onChange={handlePassword} value={password}  />
                  <p className={`absolute top-[-23px] left-[33PX] font-open text-sm text-[#11175D] bg-white px-4 py-3 ${passwordError ? 'text-[#B44242]' : ''}`}>Password</p>
                  {
                  signUpDone &&
                  <p className='font-pop font-medium text-sm text-[#5CB85C] bg-[#DCFFDC] px-4 py-3 mt-10 rounded'>{signUpDone}</p>
                  }
                  {
                    showPassword?
                    <BsEyeFill onClick={()=>setshowPassword(!showPassword)} className='absolute top-[22px] right-[19px] text-[#11175D]'/>
                    :
                    <BsEyeSlashFill onClick={()=>setshowPassword(!showPassword)} className='absolute top-[22px] right-[19px] text-[#11175D]'/>
                  }
                  {
                    passwordError &&
                    <p className='font-open text-sm text-[#B44242] bg-[#F8D7D7] px-4 py-2 mt-2 rounded'>{passwordError}</p>
                  }
                </div>


                {/* SignUp Button */}
                <button className='px-[138px] py-5 text-white bg-brand rounded-[86px] cursor-pointer' onClick={handleClick}>Sign Up </button>
                <p className='font-open text-sm text-[#03014C] px-[60px] mt-[35px]'>Already  have an account ? <span className='font-open font-bold text-sm text-[#EA6C00]'> <Link to='/login'> Sign In</Link> </span> </p>
            </div>
        </div>
        <div className='w-1/2'>
            <img className='w-full h-screen object-cover' src={LoginImage} alt="" />
        </div>
    </div>
  )
}

export default Registration