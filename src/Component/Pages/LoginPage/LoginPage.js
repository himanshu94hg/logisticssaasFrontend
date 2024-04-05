import './LoginPage.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { LOGIN_DATA } from '../../../redux/constants/auth';
import { getIndexRoute, indexPattern, signUpPattern } from '../../../Routes';
import { toast } from 'react-toastify';
import { errorHandleSecond, errorHandlefirst, errorinApi } from '../../../customFunction/errorHandling';
import Logo from '../../../assets/image/logo/logo.svg'


const LoginPage = ({ setTokenExists, tokenExists }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false)


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
        // localStorage.setItem('token', token);
        Cookies.set('user_id', response?.data?.user_id)
        dispatch({ type: LOGIN_DATA, payload: response })
        window.location.reload()
      }

    } catch (error) {
      console.log(error,"this is a error data")
      const errorType = typeof error?.response?.data.detail;
      if (errorType === "string") {
        errorHandlefirst(error?.response?.data.detail)
      } 
      else if(error?.response?.status===500){
        errorinApi()
      }
      else {
        errorHandleSecond(error?.response?.data)
      }
    }
  }

  return (
    <>
      <section className='login-section'>
        <div className="signin row">
          <div className='col-md-8 col-lg-6'></div>
          <div className='left-side col-md-4 col-lg-6'>
            <div className="content">
              <img src={Logo} alt="Logo" height={25} />
              <form onSubmit={handleLogin} className="form">
                <div className="inputBox">
                  <input
                    className='input-field'
                    // id='username'
                    type="text"
                    value={username}
                    autoComplete="new-username"
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                  <i>Username</i>
                </div>
                <div className="inputBox">
                  <input
                    className='input-field'
                    // id='password'
                    type="password"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                  <i>Password</i>
                </div>
                <div className="links">
                  <a href="#">Forgot Password?</a>
                </div>
                <button className='btn main-button' type="submit" >Login</button>
              </form>
              <p className='signup-text'>Kindly <a href="#" onClick={() => navigate(signUpPattern)}>Signup</a> if you are a new user.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
