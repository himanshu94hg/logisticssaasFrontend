import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "./signupPage.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginPattern } from '../../../Routes';

const SignUpPage = () => {
    const [UserRole, setUserRole] = useState("seller")
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
                                    <label>
                                        <input className='input-field' id="first_name" placeholder="First name"  {...register("first_name", { required: true })} />
                                        {errors.first_name && <p className="error-message">First name is required!</p>}
                                    </label>
                                    <label>
                                        <input className='input-field' id="last_name" placeholder="Last name" {...register("last_name", { required: true })} />
                                        {errors.last_name && <p className="error-message">Last name is required!</p>}
                                    </label>
                                    <label>
                                        <input className='input-field' id="company_name" placeholder="Company Name"   {...register("company_name", { required: true })} />
                                        {errors.company_name && <p className="error-message">This field is required</p>}
                                    </label>
                                    <label>
                                        <input className='input-field' id="contact_number" placeholder="Contact Number" {...register("contact_number", { required: true })} />
                                        {errors.contact_number && <p className="error-message">Contact number is required</p>}
                                    </label>
                                    <label>
                                        <input className='input-field' id="email" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                                        {errors.email && <p className="error-message">Please enter a valid email address</p>}
                                    </label>
                                    <label>
                                        <input className='input-field' id="password" placeholder="Password" {...register("password", { required: true, minLength: 6 })} type="password" />
                                        {errors.password && <p className="error-message">Password must be at least 6 characters</p>}
                                    </label>
                                    <button type="submit" className="btn main-button">Sign Up</button>

                                    <p className='signup-text'>Already a member? <button className='btn p-0' href="#" onClick={() => navigate(loginPattern)}>Login</button></p>

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
