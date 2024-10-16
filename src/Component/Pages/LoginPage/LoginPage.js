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
import globalDebouncedClick from '../../../debounce';
import { BASE_URL_CORE } from '../../../axios/config';
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import Logo from '../../../assets/image/logo/logo.svg';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import { LOGIN_DATA } from '../../../redux/constants/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { indexPattern, signUpPattern } from '../../../Routes';
import { customErrorFunction } from '../../../customFunction/errorHandling';

const LoginPage = ({ setTokenExists }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = useLocation();
  const [timer, setTimer] = useState(20);
  const token = Cookies.get('access_token');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [SentOtp, setSentOtp] = useState(false);
  const [OtpLogin, setOtpLogin] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [LoaderRing, setLoaderRing] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [PasswordShow, setPasswordShow] = useState(false);
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

  useEffect(() => {
    if (token) {
      setTokenExists(true);
      navigate('/');
    }
    if (token && pathname.pathname === "/login") {
      window.location.reload();
    }
  }, [navigate, setTokenExists, pathname]);

  const handleClickLogin = async () => {
    setLoaderRing(true);
    try {
      const response = await axios.post(`${BASE_URL_CORE}/core-api/accounts/user-sign/`, {
        contact_number: username,
        password: password,
      });
      if (response.status === 200) {
        toast.success("User Logged in successfully!");
        setLoaderRing(false);
        setTokenExists(true);
        navigate(indexPattern);
        window.location.reload();
        Cookies.set('user_id', response.data.user_id);
        Cookies.set('emp_id', response.data.employee_id);
        dispatch({ type: LOGIN_DATA, payload: response });
        localStorage.setItem('user_type', response.data.type);
        Cookies.set('access_token', response.data.access_token, { path: '/' });
      }
    } catch (error) {
      customErrorFunction(error);
      setLoaderRing(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    globalDebouncedClick(() => handleClickLogin());
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoaderRing(true);
    try {
      const response = await axios.post(`${BASE_URL_CORE}/core-api/accounts/verify-otp/`, {
        contact_number: username,
        otp: password,
        feature: "sign-in"
      });
      if (response.status === 200) {
        toast.success("OTP Verified successfully!");
        setLoaderRing(false);
        setOtpVerified(true);

      }
    } catch (error) {
      customErrorFunction(error);
      setLoaderRing(false);
    }
  };

  const handleSendOTP = async () => {
    if (!username) {
      toast.error("Please enter your mobile number.");
      return;
    }
    setSentOtp(true);
    setTimer(20);
    setIsTimerRunning(true);
    try {
      const response = await axios.get(`${BASE_URL_CORE}/core-api/accounts/send-otp/`, {
        params: {
          contact_number: username,
          feature: 'sign-in'
        }
      });
      if (response.status === 200) {
        toast.success("OTP Sent successfully!");
      }
    } catch (error) {
      customErrorFunction(error);
    }
  };


  const handleLoginOptions = () => {
    setOtpLogin(!OtpLogin);
    setSentOtp(false);
  };

  const handleResendOTP = () => {
    handleSendOTP();
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoaderRing(true);
    try {
      const response = await axios.post(`${BASE_URL_CORE}/core-api/accounts/seller-forget-password/`, {
        contact_number: username,
        password: newPassword,
      });
      if (response.status === 200) {
        toast.success("Password reset successfully!");
        setUsername('');
        setNewPassword('');
        setOtpVerified(false);
        setOtpLogin(false);
        setSentOtp(false);
        setPassword('');
        setLoaderRing(false);
        navigate('/login');
      }
    } catch (error) {
      customErrorFunction(error);
      setLoaderRing(false);
    }
  };


  useEffect(() => {
    if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [timer]);

  const resendText = isTimerRunning ? `Resend in ${timer} seconds` : 'Resend';

  const handlePasswordShow = () => {
    setPasswordShow(!PasswordShow);
  };

  return (
    <>
      <section className='login-section'>
        <div className="signin row">
          <div className='login-logo-container'>
            <img src={Logo} alt="logo" />
          </div>
          <div className='col-md-9 col-lg-9 left-side'>
            <div className=''></div>
          </div>
          <div className='col-md-3 col-lg-3 right-side'>
            <div className="content">
              <img src={Logo} alt="Logo" height={25} />
              <h3 className='text-center mb-0'>Login To Shipease</h3>
              {!OtpLogin ? (
                <>
                  <form onSubmit={handleLogin} className="form">
                    <label className="inputBox">
                      <input
                        className='input-field'
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
                        type={PasswordShow ? "text" : "password"}
                        value={password}
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                      <i>Password</i>
                      <span onClick={handlePasswordShow} className='eye-icons'>
                        {PasswordShow ? <IoIosEye /> : <IoIosEyeOff />}
                      </span>
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
                    <button className='btn main-button' type="submit">Login</button>
                  </form>
                </>
              ) : (
                <>
                  <form onSubmit={SentOtp && otpVerified ? handlePasswordReset : handleOTPSubmit} className="form">
                    {!otpVerified && (
                      <>
                        <label className="inputBox">
                          <input
                            className='input-field'
                            type="text"
                            value={username}
                            autoComplete="new-username"
                            onChange={(e) => setUsername(e.target.value)}
                            required />
                          <i>Mobile Number</i>
                        </label>
                        {SentOtp && (
                          <>
                            <label className="inputBox">
                              <input
                                className='input-field'
                                type="password"
                                value={password}
                                autoComplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                              <i>Enter OTP</i>
                            </label>
                            <div className="links justify-content-end">
                              <button type='button' onClick={handleResendOTP} className='btn p-0'>{resendText}</button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {otpVerified && (
                      <label className="inputBox">
                        <input
                          className='input-field'
                          type={PasswordShow ? "text" : "password"}
                          value={newPassword}
                          autoComplete="new-password"
                          onChange={(e) => setNewPassword(e.target.value)}
                          required />
                        <i>New Password</i>
                        <span onClick={handlePasswordShow} className='eye-icons'>
                          {PasswordShow ? <IoIosEye /> : <IoIosEyeOff />}
                        </span>
                      </label>
                    )}
                    <button
                      type='button'
                      className='btn main-button'
                      onClick={SentOtp ? (otpVerified ? handlePasswordReset : handleOTPSubmit) : handleSendOTP}
                    >
                      {SentOtp ? (otpVerified ? 'Reset Password' : 'Submit OTP') : 'Send OTP'}
                    </button>

                  </form>
                </>
              )}
              <div className='other-signin-options'>
                <p>or login using</p>
                <div className='login-options-buttons'>
                  <button className='btn' onClick={handleLoginOptions}>
                    {!OtpLogin ? (
                      <>
                        <PhoneIcon /><span>Phone</span>
                      </>
                    ) : (
                      <>
                        <EmailIcon /><span>Email</span>
                      </>
                    )}
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
      {LoaderRing && <LoaderScreen />}
    </>
  );
}

export default LoginPage;
