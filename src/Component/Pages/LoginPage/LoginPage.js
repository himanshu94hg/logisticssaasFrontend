import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { getIndexRoute, indexPattern } from '../../../Routes';

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false)


  const handleLogin = async (e) => {
    setStatus(true)
    e.preventDefault();
    try {
      const response = await axios.post('http://65.2.38.87:8088/core-api/accounts/user-sign/', {
        contact_number: username,
        password: password,
      });
      Cookies.set('access_token', response.data.access_token)
      if (response.status == 200) {
        navigate(indexPattern); 
        setIsLoggedIn(true)
        window.location.reload();
      }

    } catch (error) {
      setError('Invalid username or password');
    }
  }

  // useEffect(() => {
  //   if(status){
  //     navigate(indexPattern)
  //   }
  // }, [status])

  return (
    <section className='login-section'>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>

      <div className="signin">
        <div className="content">
          <h2>Sign In</h2>
          <form onSubmit={handleLogin} className="form">
            <div className="inputBox">
              <input
                className='input-field'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
              <i>Username</i>
            </div>
            <div className="inputBox">
              <input
                className='input-field'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
              <i>Password</i>
            </div>
            <div className="links">
              <a href="#">Forgot Password?</a> <a href="#">Signup</a>
            </div>
            <button className='btn main-button' type="submit" >Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
