import './LoginPage.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import PhoneIcon from './Icons/PhoneIcon';
import EmailIcon from './Icons/EmailIcon';
import GoogleIcon from './Icons/GoogleIcon';
import FacebookIcon from './Icons/FacebookIcon';
import React, { useEffect, useState } from 'react';
import Logo from '../../../assets/image/logo/logo.svg'
import { LOGIN_DATA } from '../../../redux/constants/auth';
import { indexPattern, signUpPattern } from '../../../Routes';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { errorHandleSecond, errorHandlefirst, errorinApi } from '../../../customFunction/errorHandling';


const LoginPage = ({ setTokenExists, tokenExists }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const pathname = useLocation()
  const params = useParams()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false)
  const [OtpLogin, setOtpLogin] = useState(false)
  const [rememberMe, setRememberMe] = useState(false);
  const [SentOtp, setSentOtp] = useState(false)
  const [timer, setTimer] = useState(20);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isTimerRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer, isTimerRunning]);

  const handleLogin = async (e) => {
    setStatus(true)
    e.preventDefault();
    try {
      const response = await axios.post('https://dev.shipease.in/core-api/accounts/user-sign/', {
        contact_number: username,
        password: password,
      });
      if (response.status == 200) {
        toast.success("User Logged in succesfully!")
        setTokenExists(true)
        navigate(indexPattern);
        Cookies.set('access_token', response?.data?.access_token)
        Cookies.set('user_id', response?.data?.user_id)
        dispatch({ type: LOGIN_DATA, payload: response })
        window.location.reload()
      }

    } catch (error) {
      const errorType = typeof error?.response?.data.detail;
      if (errorType === "string") {
        errorHandlefirst(error?.response?.data.detail)
      }
      else if (error?.response?.status === 500) {
        errorinApi()
      }
      else {
        errorHandleSecond(error?.response?.data)
      }
    }
  }

  const handleOTPSubmit = (e) => {
    e.preventDefault();
  }

  const handleSendOTP = () => {
    setSentOtp(true)
    setTimer(20); 
    setIsTimerRunning(true);
  }

  const handleLoginOptions = () => {
    setOtpLogin(!OtpLogin)
    setSentOtp(false)
  }

  const handleResendOTP = () => {
  }

  useEffect(() => {
    if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [timer]);

  const resendText = isTimerRunning ? `Resend in ${timer} seconds` : 'Resend';

  return (
    <>
      <section className='login-section'>
        <div className="signin row">
          <div className='login-logo-container'>
            {/* <div className='login-lc-bg'>
              <SVGFigure />
            </div> */}
            <img src={Logo} alt="logo" />
          </div>
          <div className='col-md-10 col-lg-10 left-side'>
            <div className=''>
              {/* <img src={loginBG} alt="" /> */}
            </div>
          </div>
          <div className='col-md-2 col-lg-2 right-side'>
            <div className="content">
              {/* <img src={Logo} alt="Logo" height={25} /> */}
              <h3 className='text-center mb-0'>Login</h3>
              {!OtpLogin ? <>
                <form onSubmit={handleLogin} className="form">
                  <label className="inputBox">
                    <input
                      className='input-field'
                      // id='username'
                      type="text"
                      value={username}
                      autoComplete="new-username"
                      onChange={(e) => setUsername(e.target.value)}
                      required />
                    <i>Username</i>
                  </label>
                  <label className="inputBox">
                    <input
                      className='input-field'
                      // id='password'
                      type="password"
                      value={password}
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                      required />
                    <i>Password</i>
                  </label>
                  <div className="links justify-content-between">
                    <label>
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className='me-1'
                      />
                      Remember me
                    </label>
                    <button type='button' onClick={handleLoginOptions} className='btn p-0'>Forgot Password?</button>
                  </div>
                  <button className='btn main-button' type="submit" >Login</button>
                </form>
              </> :
                <>
                  <form onSubmit={handleOTPSubmit} className="form">
                    <label className="inputBox">
                      <input
                        className='input-field'
                        // id='username'
                        type="text"
                        value={username}
                        autoComplete="new-username"
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                      <i>Mobile Number</i>
                    </label>
                    {
                      SentOtp &&
                      <>
                        <label className="inputBox">
                          <input
                            className='input-field'
                            // id='password'
                            type="password"
                            value={password}
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <i>Enter OTP</i>
                        </label>
                        <div className="links justify-content-end">
                          <button type='button' onClick={handleResendOTP} className='btn p-0'>{resendText}</button>
                        </div>
                      </>
                    }

                    <button type='button' className='btn main-button' onClick={handleSendOTP}>
                      {SentOtp ? 'Submit' : 'Send OTP'}
                    </button>
                  </form>
                </>
              }

              <div className='other-signin-options'>
                <p>or Signup using</p>
                <div className='login-options-buttons'>
                  <button className='btn' onClick={handleLoginOptions}>
                    {!OtpLogin ?
                      <><PhoneIcon /><span>Phone</span></>
                      :
                      <><EmailIcon /><span>Email</span></>
                    }

                  </button>
                  <button className='btn'><GoogleIcon /><span>Google</span></button>
                  <button className='btn'><FacebookIcon /><span>Facebook</span></button>
                </div>
              </div>
              <p className='signup-text'>Kindly <button className='btn p-0' href="#" onClick={() => navigate(signUpPattern)}>Signup</button> if you are a new user.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
