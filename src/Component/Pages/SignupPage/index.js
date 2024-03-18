import React from 'react';
import { useForm } from 'react-hook-form';
import "./signupPage.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginPattern } from '../../../Routes';

const SignUpPage = () => {
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

    return (
        <>
            <section className='signup-section'>
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

                <div className="signup">
                    <div className="content">
                        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <h2 className='text-center mb-3'>SIGN UP</h2>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        {/* <label htmlFor="first_name">First Name</label> */}
                                        <input id="first_name" placeholder="First name"  {...register("first_name",  { required: true })} />
                                        {errors.first_name && <p className="error-message">First name is required!</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        {/* <label htmlFor="last_name">Last Name</label> */}
                                        <input id="last_name" placeholder="Last name" {...register("last_name", { required: true })} />
                                        {errors.last_name && <p className="error-message">Last name is required!</p>}
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <div className="form-group">
                                        {/* <label htmlFor="company_name">Company Name</label> */}
                                        <input id="company_name" placeholder="Company Name"   {...register("company_name", { required: true })} />
                                        {errors.company_name && <p className="error-message">This field is required</p>}
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <div className="form-group">
                                        {/* <label htmlFor="company_name">Contact Number</label> */}
                                        <input id="contact_number" placeholder="Contact Number" {...register("contact_number", { required: true })} />
                                        {errors.contact_number && <p className="error-message">Contact number is required</p>}
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <div className="form-group">
                                        {/* <label htmlFor="email">Email</label> */}
                                        <input id="email" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                                        {errors.email && <p className="error-message">Please enter a valid email address</p>}
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <div className="form-group">
                                        {/* <label htmlFor="password">Password</label> */}
                                        <input id="password" placeholder="Password" {...register("password", { required: true, minLength: 6 })} type="password" />
                                        {errors.password && <p className="error-message">Password must be at least 6 characters</p>}
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <p className='fw-bold d-flex justify-content-end'>Already a member? <Link to="/login" className='login-btn'>Login</Link></p>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <button type="submit" className="submit-button">Sign Up</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>


        </>

    );
};

export default SignUpPage;
