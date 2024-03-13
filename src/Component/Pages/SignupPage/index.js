import React from 'react';
import { useForm } from 'react-hook-form';
import "./signupPage.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginPattern } from '../../../Routes';

const SignUpPage = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        dispatch({ type: "SELLER_SIGNUP_ACTION", payload: data })
    };


    const { signUpRes } = useSelector(state => state?.authDataReducer)

    if (signUpRes) {
        navigate(loginPattern)
    }
    console.log(signUpRes, "this is a signup res data")

    return (
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input id="first_name" {...register("first_name", { required: true })} />
                        {errors.first_name && <span className="error-message">First name is required!</span>}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input id="last_name" {...register("last_name", { required: true })} />
                        {errors.last_name && <span className="error-message">Last name is required!</span>}
                    </div>
                </div>
                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label htmlFor="company_name">Company Name</label>
                        <input id="company_name" {...register("company_name", { required: true })} />
                        {errors.company_name && <span className="error-message">This field is required</span>}
                    </div>
                </div>
                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label htmlFor="company_name">Contact Number</label>
                        <input id="contact_number" {...register("contact_number", { required: true })} />
                        {errors.contact_number && <span className="error-message">Contact number is required</span>}
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                        {errors.email && <span className="error-message">Please enter a valid email address</span>}
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" {...register("password", { required: true, minLength: 6 })} type="password" />
                        {errors.password && <span className="error-message">Password must be at least 6 characters</span>}
                    </div>
                </div>

                <div className="col-md-12 d-flex justify-content-end">
                    <p><span className='fw-bold'>Already a member?</span> <Link to="/login" className='login-btn'>Login</Link></p>
                </div>
                <div className="col-md-12 mt-3">
                    <button type="submit" className="submit-button">Sign Up</button>
                </div>
            </div>
        </form>
    );
};

export default SignUpPage;
