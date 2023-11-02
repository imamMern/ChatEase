import React, { useState } from 'react'
import Login from '/src/assets/log.png'
import google from '/src/assets/googleicon.svg'
import { Link, useNavigate } from 'react-router-dom'
import { BsEyeFill } from 'react-icons/bs'
import { BsEyeSlashFill} from 'react-icons/bs'
import { Hourglass} from  'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { userLoginInfo } from '../../slices/userSlice'
import { useDispatch } from 'react-redux'


const LoginPage = () => {

    // Hook for dispatch
    const dispatch = useDispatch()

  // Firebase Const
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // Navigate Hook import
  const navigate = useNavigate('')

  // Usestate for email
  const [email, setEmail] = useState('')
  const [emailError, setemailError] = useState('')

  //Usestate for password
  const [password, setpassword] = useState('')
  const [passwordError, setpasswordError] = useState('')

  // Usestate For Password eye Icon
  const [showPassword, setshowPassword] = useState('')

   // Usestate For login button animation
   const [isLoading, setIsLoading] = useState(false)

   //Usestate For Login details correction
   const [loginError, setLoginError] = useState('')


  const handleEmail = (e) =>{
    setEmail(e.target.value);
    setemailError('')
  }

  const handlePassword = (e) =>{
    setpassword(e.target.value);
    setpasswordError('')
  }

  // Google sign in popup Function
  const googleSignIn = () => {
    signInWithPopup(auth, provider)
    .then(() => {
      setTimeout(()=>{
        navigate('/')
      }, 2000)
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
  }
  const handleClick = () => {

    setIsLoading(true);

      if(!email){
        setemailError('Enter an email address');
      }
      else{
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          setemailError('Please enter a valid email address');
        }
      }
      if(!password){
        setpasswordError('Enter a password');
      }
      if(email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ){
        signInWithEmailAndPassword(auth, email, password)
          .then((user) => {
            toast.success('Login Successful')
            console.log(user.user);
            dispatch(userLoginInfo(user.user));
            localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user.user)))
            setTimeout(()=>{
              navigate('/')
            }, 2000)
          })
          .catch((error) => {
            const errorCode = error.code;
            if(errorCode.includes('auth/invalid-login-credentials')){
              setLoginError('Please input correct Email & Password')
            }
          });
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

    }

  return (
    <div>
        <div className='flex'>
              <div className='flex w-1/2 justify-end'>
                <div className='mr-[147px] mt-[221px] mb-[117px] mr-[142px]'>

                    {/* Heading and Button */}
                    <h2 className='font-open text-[34px] text-[#11175D] font-bold mb-[30px]'>Login to your account!</h2>
                    <button onClick={googleSignIn} className='flex items-center jutify-between gap-[10px] px-[30px] py-[22px] border-[1px] border-bor/[0.3] rounded-lg font-open text-sm font-semibold text-[#03014C] mb-12'> <img src={google} alt="" /> Login with Google</button>

                      {/* SuccessFully Login Toast Effect */}
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
                      <input className={emailError ? 'border-b-2 border-bor/[0.3] outline-none font-open text-[20px]  py-4 text-[#03014C] w-full border-red-500':'border-b-2 border-bor/[0.3] outline-none font-open text-[20px]  py-4 text-[#03014C] w-full'}  type="mail" placeholder='enter your mail' onChange={handleEmail} />
                      <p className={`absolute top-[-23px] left-0 mb-2 font-open text-sm text-[#11175D] bg-transparent py-3 ${emailError ? 'text-[#B44242]' : ''}`}>{emailError ? emailError : 'Email Address'}</p>

                    </div>

                    {/* Input field For Password */}
                    <div className='relative w-80 mb-[50px]'>
                      <input className={passwordError ? ' border-b-2 border-bor/[0.3] outline-none font-open text-[20px]  py-4 text-[#03014C] w-full border-red-500':'border-b-2 border-bor/[0.3] outline-none font-open text-[20px]  py-4 text-[#03014C] w-full'} type={showPassword ? 'text' : 'password'} onChange={handlePassword} />
                      <p className={`absolute top-[-23px] left-0 font-open text-sm text-[#11175D] bg-transparent py-3 ${passwordError ? 'text-[#B44242]' : ''}`}>Password</p>
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

                      {
                        loginError &&
                        <p className='font-open text-md text-[#D72020] py-2 mt-5 rounded'>{loginError}</p>
                      }
                    </div>


                    {/* SignUp Button */}
                    <button className='px-[122px] py-6 text-white font-semibold bg-brand rounded cursor-pointer' onClick={handleClick}>{isLoading ? (
                    <div className="flex items-center">
                        <Hourglass
                          visible={true}
                          height="30"
                          width="30"
                          ariaLabel="hourglass-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          colors={['white', '#E5E5E6']}
                        />
                    <span className="ml-2">Logging In...</span>
                    </div>)
                    :
                    ('Login to Continue') } </button>

                    <p className='font-open text-sm text-[#03014C]  mt-[35px] text-center'>Don’t have an account ? <span className='font-open font-bold text-sm text-[#EA6C00]'> <Link to='/registration'> Sign Up</Link> </span> </p>
                    <p className='font-open text-sm font-semibold text-[#EA6C00]  mt-[20px] text-center'> <Link to ='/fogotpassword'> Forgotten Password ?</Link>  </p>
                </div>
            </div>
            <div className='w-1/2'>
                <img className='w-full h-screen object-cover' src={Login} alt="" />
            </div>

        </div>
    </div>
  )
}

export default LoginPage