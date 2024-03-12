import "./signupPage.css"
import React from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUpPage = () => {
  return (
    <Container className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .required('First name is required'),
          lastName: Yup.string()
            .required('Last name is required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
          password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters long')
        })}
        onSubmit={(values, { setSubmitting }) => {
          // You can perform form submission logic here, e.g., sending data to the server
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form className="signup-form" onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`signup-input ${touched.firstName && errors.firstName ? 'is-invalid' : ''}`}
              />
              {touched.firstName && errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`signup-input ${touched.lastName && errors.lastName ? 'is-invalid' : ''}`}
              />
              {touched.lastName && errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`signup-input ${touched.email && errors.email ? 'is-invalid' : ''}`}
              />
              {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`signup-input ${touched.password && errors.password ? 'is-invalid' : ''}`}
              />
              {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting} className="signup-button">
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignUpPage;
