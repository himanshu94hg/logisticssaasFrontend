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

const SignUpPage = () => {
    const [UserRole, setUserRole] = useState("seller")
    const [numberOfOrders, setnumberOfOrders] = useState(null)
    const [TrackOption, setTrackOption] = useState('AWB Number')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

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

    console.log(numberOfOrders, 'this is user role')

    const onInputChange = e => {
        const { value } = e.target;
        console.log('Input value: ', value);

        const re = /^[A-Za-z]+$/;
        if (value === "" || re.test(value)) {
            //   setTxt(value);
        }
    }

    return (
        <>
            <section className='signup-section'>
                <div className="signup row">
                    <div className='col-md-8 col-lg-6'></div>
                    <div className='left-side col-md-4 col-lg-6'>
                        <div className="content">
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
                                    <h3 className='text-center'>Sign up with us today</h3>
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
                                                    autoComplete="off"
                                                    type='text'
                                                    className='input-field'
                                                    id="email"
                                                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                                    required
                                                />
                                                <i>Email</i>
                                                {errors.email && <p className="error-message">Please enter a valid email address</p>}
                                            </label>
                                            <label className="inputBox">
                                                <input
                                                    autoComplete="off"
                                                    className='input-field'
                                                    type='text'
                                                    id="password"
                                                    {...register("password", { required: true, minLength: 6 })}
                                                    required
                                                />
                                                <i>Password</i>
                                                {errors.password && <p className="error-message">Password must be at least 6 characters</p>}
                                            </label>
                                        </div>
                                        <label className="inputBox">
                                            <select value={numberOfOrders} onChange={handleNumberOfOrders} className='select-field'>
                                                <option value=""></option>
                                                <option value="Setting up a new business">Setting up a new business</option>
                                                <option value="Between 1-10 orders">Between 1-10 orders</option>
                                                <option value="11-100 orders">11-100 orders</option>
                                                <option value="101-1000 orders">101-1000 orders</option>
                                                <option value="1001-5000 orders">1001-5000 orders</option>
                                                <option value="More than 5000 orders">More than 5000 orders</option>
                                            </select>
                                            <i className={`${numberOfOrders == null || numberOfOrders === "" ? '' : 'd-none'}`}>How many orders do you ship in a month ?</i>
                                        </label>
                                    </div>
                                    <button type="submit" className="btn main-button">Sign Up</button>
                                    <p className='signup-text text-center m-0'>Already a member? <button className='btn p-0' href="#" onClick={() => navigate(loginPattern)}>Login</button></p>
                                </form>
                            }
                            {
                                UserRole === 'buyer' &&
                                <form className="form gap-4 track-order" style={{ minHeight: '62vh' }}>
                                    <h4 className='m-0 text-center mt-3'>Trace Your Order's Progress</h4>
                                    <img src={TrackYourOrder} alt="TrackYourOrder" />

                                    <div className='d-flex gap-3 align-items-end'>
                                        <label className='inputBox' style={{ maxWidth: '140px' }}>
                                            <select className='select-field' onChange={handleTrackOptionChange}>
                                                <option value="mobile number">Mobile Number</option>
                                                <option value="AWB number">AWB Number</option>
                                                <option value="order ID">Order ID</option>
                                            </select>
                                        </label>
                                        <label className='inputBox'>
                                            <input type="text" className='input-field' required />
                                            <i>Enter your {TrackOption}</i>
                                        </label>
                                    </div>
                                    {
                                        TrackOption === 'order ID' &&
                                        <label className='inputBox'>
                                            <input type="text" className='input-field' required />
                                            <i>Enter your Phone or Email</i>
                                        </label>
                                    }
                                    <button className='btn main-button'>
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
