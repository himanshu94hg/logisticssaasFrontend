import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "./signupPage.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginPattern } from '../../../Routes';

const SignUpPage = () => {
    const [UserRole, setUserRole] = useState("seller")
    const [numberOfOrders, setnumberOfOrders] = useState(null)
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

    // console.log(UserRole, 'this is user role')


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
                                    <h3 className='text-center mb-3'>Create an Account</h3>
                                    <div className='d-flex gap-3'>
                                        <label className="inputBox">
                                            <input
                                                autoComplete="off"
                                                type='text'
                                                className='input-field'
                                                id="first_name"
                                                {...register("first_name", { required: true })}
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
                                                id="contact_number"
                                                {...register("contact_number", { required: true })}
                                                required
                                            />
                                            <i>Contact Number</i>
                                            {errors.contact_number && <p className="error-message">Contact number is required</p>}
                                        </label>
                                        <label className="inputBox">
                                            <input
                                                autoComplete="off"
                                                type='text'
                                                className='input-field'
                                                id="company_name"
                                                {...register("company_name", { required: true })}
                                                required
                                            />
                                            <i>Company Name</i>
                                            {errors.company_name && <p className="error-message">This field is required</p>}
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
                                        <i className={`${numberOfOrders !== (null || "") ? 'd-none' : ''}`}>How many orders do you ship in a month ?</i>
                                    </label>
                                    <button type="submit" className="btn main-button">Sign Up</button>
                                    <p className='signup-text text-center'>Already a member? <button className='btn p-0' href="#" onClick={() => navigate(loginPattern)}>Login</button></p>
                                </form>
                            }

                            {
                                UserRole === 'buyer' &&
                                <form className="form">

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
