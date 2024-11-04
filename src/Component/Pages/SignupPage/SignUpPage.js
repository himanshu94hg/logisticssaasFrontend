import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "./signupPage.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginPattern } from '../../../Routes';
import GoogleIcon from '../LoginPage/Icons/GoogleIcon';
import FacebookIcon from '../LoginPage/Icons/FacebookIcon';
import TrackYourOrder from '../../../assets/image/settingsBG/TrackYourOrder1.png'
import loginBG from '../../../assets/image/login_bg2.svg'
import Logo from '../../../assets/image/logo/logo.svg'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import Select from 'react-select';

const SignUpPage = () => {
    const [UserRole, setUserRole] = useState("seller")
    const [numberOfOrders, setnumberOfOrders] = useState(null)
    const [TrackOption, setTrackOption] = useState('Mobile Number')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [PasswordShow, setPasswordShow] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const options = [
        { value: 'Between 1-10 orders', label: 'Between 1-10 orders' },
        { value: '11-100 orders', label: '11-100 orders' },
        { value: '101-1000 orders', label: '101-1000 orders' },
        { value: '1001-5000 orders', label: '1001-5000 orders' },
        { value: 'More than 5000 orders', label: 'More than 5000 orders' },
        { value: 'Setting up a new business', label: 'Setting up a new business' }
    ];

    const onSubmit = (data) => {
        dispatch({ type: "SELLER_SIGNUP_ACTION", payload: data })
    };


    const { signUpRes } = useSelector(state => state?.authDataReducer)

    if (signUpRes) {
        navigate(loginPattern)
    }

    const handleUserRole = (event) => {
        setUserRole(event.target.value);
    };

    const handleNumberOfOrders = (e) => {
        setnumberOfOrders(e.target.value)
    }

    const handleTrackOptionChange = (e) => {
        setTrackOption(e.target.value);
    };

    const onInputChange = e => {
        const { value } = e.target;
        const re = /^[A-Za-z]+$/;
        if (value === "" || re.test(value)) {
            //   setTxt(value);
        }
    }

    const handlePasswordShow = () => {
        setPasswordShow(!PasswordShow)
    }

    const customStyles = {
        menuList: (provided) => ({
            ...provided,
            maxHeight: '100px',
            overflowY: 'auto',
        }),
    };

    return (
        <>
            <section className='signup-section'>
                <div className="signup row">
                    <div className='signup-logo-container'>
                        {/* <div className='login-lc-bg'>
                            <SVGFigure />
                        </div> */}
                        <img src={Logo} alt="logo" />
                    </div>
                    <div className='col-md-9 col-lg-9 left-side'>
                        <div className=''>
                            {/* <img src={loginBG} alt="" /> */}
                        </div>
                    </div>
                    <div className='right-side col-md-3 col-lg-3'>
                        <div className="content">
                            <img src={Logo} alt="Logo" height={25} />
                            <div className='user-role-select'>
                                <label htmlFor="seller">
                                    <input
                                        type="radio"
                                        id="seller"
                                        name="user"
                                        value="seller"
                                        checked={UserRole === 'seller'}
                                        onChange={handleUserRole}
                                    />
                                    Seller Signup
                                </label>
                                <label htmlFor="buyer">
                                    <input
                                        type="radio"
                                        id="buyer"
                                        name="user"
                                        value="buyer"
                                        checked={UserRole === 'buyer'}
                                        onChange={handleUserRole}
                                    />
                                    Track Your Order
                                </label>
                            </div>
                            {
                                UserRole === 'seller' &&
                                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                                    <h3 className='text-center'>Sign Up With Us Today!</h3>
                                    <div className='signup-with-social'>
                                        <button type='button' className='btn'><GoogleIcon /><span>Signup using Google</span></button>
                                        <button type='button' className='btn'><FacebookIcon /><span>Signup using facebook</span></button>
                                    </div>
                                    <div className='signup-division'>
                                        <hr />
                                        <span>OR</span>
                                    </div>
                                    <div className='d-flex gap-3 flex-column'>
                                        <div className='d-flex gap-3'>
                                            <label className="inputBox">
                                                <input
                                                    autoComplete="off"
                                                    type='text'
                                                    className='input-field'
                                                    id="first_name"
                                                    onChange={onInputChange}
                                                    {...register("first_name", {
                                                        required: true,
                                                    })}
                                                    maxLength={50}
                                                    onKeyPress={(e) => {
                                                        const allowedCharacters = /^[a-zA-Z0-9\s]*$/;
                                                        if (
                                                            e.key === ' ' &&
                                                            e.target.value.endsWith(' ')
                                                        ) {
                                                            e.preventDefault();
                                                        } else if (!allowedCharacters.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    required
                                                />
                                                <i>First name</i>
                                                {errors.first_name && <p className="error-message">First name is required!</p>}
                                            </label>
                                            <label className="inputBox">
                                                <input
                                                    autoComplete="off"
                                                    type='text'
                                                    className='input-field'
                                                    id="last_name"
                                                    {...register("last_name", { required: true })}
                                                    maxLength={50}
                                                    onKeyPress={(e) => {
                                                        const allowedCharacters = /^[a-zA-Z0-9\s]*$/;
                                                        if (
                                                            e.key === ' ' &&
                                                            e.target.value.endsWith(' ')
                                                        ) {
                                                            e.preventDefault();
                                                        } else if (!allowedCharacters.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    required
                                                />
                                                <i>Last name</i>
                                                {errors.last_name && <p className="error-message">Last name is required!</p>}
                                            </label>
                                        </div>
                                        <div className='d-flex gap-3'>
                                            <label className="inputBox">
                                                <input
                                                    autoComplete="off"
                                                    type='text'
                                                    className='input-field'
                                                    id="company_name"
                                                    {...register("company_name", { required: true })}
                                                    maxLength={50}
                                                    onKeyPress={(e) => {
                                                        const allowedCharacters = /^[a-zA-Z0-9\s]*$/;
                                                        if (
                                                            e.key === ' ' &&
                                                            e.target.value.endsWith(' ')
                                                        ) {
                                                            e.preventDefault();
                                                        } else if (!allowedCharacters.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    required
                                                />
                                                <i>Company Name</i>
                                                {errors.company_name && <p className="error-message">This field is required</p>}
                                            </label>
                                            <label className="inputBox">
                                                <input
                                                    autoComplete="off"
                                                    type='text'
                                                    className='input-field'
                                                    id="contact_number"
                                                    {...register("contact_number", { required: true })}
                                                    onKeyPress={(e) => {
                                                        const allowedCharacters = /^[0-9\s]*$/;
                                                        if (
                                                            (e.key === ' ' && e.target.value.endsWith(' ')) ||
                                                            (!allowedCharacters.test(e.key)) ||
                                                            (e.target.value.length >= 10 && e.key !== 'Backspace' && e.key !== 'Delete')
                                                        ) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    required
                                                />
                                                <i>Contact Number</i>
                                                {errors.contact_number && <p className="error-message">Contact number is required</p>}
                                            </label>
                                        </div>
                                        <div className='d-flex gap-3'>
                                            <label className="inputBox">
                                                <input
                                                    autoComplete="new-password"
                                                    type='text'
                                                    className='input-field'
                                                    id="email"
                                                    maxLength={50}
                                                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                                    required
                                                />
                                                <i>Email</i>
                                                {errors.email && <p className="error-message">Please enter a valid email address</p>}
                                            </label>
                                            <label className="inputBox">
                                                <input
                                                    autoComplete="new-password"
                                                    className='input-field'
                                                    type={PasswordShow ? "text" : "password"}
                                                    id="password"
                                                    maxLength={50}
                                                    {...register("password", { required: true, minLength: 6 })}
                                                    required
                                                />
                                                <i>Password</i>
                                                <span onClick={handlePasswordShow} className='eye-icons'>
                                                    {
                                                        PasswordShow ?
                                                            <IoIosEye /> : <IoIosEyeOff />
                                                    }
                                                </span>
                                                {errors.password && <p className="error-message">Password must be at least 6 characters</p>}
                                            </label>
                                        </div>
                                        <label className="inputBox">
                                            {/* <select value={numberOfOrders} onChange={handleNumberOfOrders} className='select-field'>
                                                <option value="">How many orders do you ship in a month ?</option>
                                                <option value="Between 1-10 orders">Between 1-10 orders</option>
                                                <option value="11-100 orders">11-100 orders</option>
                                                <option value="101-1000 orders">101-1000 orders</option>
                                                <option value="1001-5000 orders">1001-5000 orders</option>
                                                <option value="More than 5000 orders">More than 5000 orders</option>
                                                <option value="Setting up a new business">Setting up a new business</option>
                                            </select> */}
                                            <Select
                                                value={selectedOption}
                                                onChange={handleSelectChange}
                                                options={options}
                                                placeholder='How many orders do you ship in a month?'
                                                styles={customStyles}
                                            />
                                            {/* <i className={`${numberOfOrders == null || numberOfOrders === "" ? '' : 'd-none'}`}>How many orders do you ship in a month ?</i> */}
                                        </label>
                                    </div>
                                    <button type="submit" className="btn main-button">Sign Up</button>
                                    <p className='signup-text text-center m-0'>Already a member? <button type='button' className='btn p-0' href="#" onClick={() => navigate(loginPattern)}>Login</button></p>
                                </form>
                            }
                            {
                                UserRole === 'buyer' &&
                                <form className="form gap-4 track-order">
                                    <h4 className='m-0 text-center mt-3'>Trace Your Order's Progress</h4>
                                    <img src={TrackYourOrder} alt="TrackYourOrder" />

                                    <div className='d-flex gap-3 align-items-end'>
                                        <label className='inputBox' style={{ maxWidth: '112px' }}>
                                            <select className='select-field' onChange={handleTrackOptionChange}>
                                                <option value="mobile_number">Mobile No.</option>
                                                <option value="AWB_number">AWB No.</option>
                                                <option value="order_number">Order ID</option>
                                            </select>
                                        </label>
                                        <label className='inputBox'>
                                            <input type="text" className='input-field' required />
                                            <i>Enter your {TrackOption.split("_").join(" ")}</i>
                                        </label>
                                    </div>
                                    {
                                        TrackOption === 'order ID' &&
                                        <label className='inputBox'>
                                            <input type="text" className='input-field' required />
                                            <i>Enter your Phone or Email</i>
                                        </label>
                                    }
                                    <button type='button' onClick={() => navigate('/track-your-order')} className='btn main-button'>
                                        Track Now
                                    </button>
                                </form>
                            }

                        </div>
                    </div>
                </div>
            </section>


        </>

    );
};

export default SignUpPage;
