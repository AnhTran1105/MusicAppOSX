import { useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useStore, actions } from '../../store';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const [state, dispatch] = useStore();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Reset error message for the field
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation
        const validationErrors = {};

        if (!formData.email) {
            validationErrors.email = 'Please fill out this field.';
        } else if (!isValidEmail(formData.email)) {
            validationErrors.email = 'Email is not valid.';
        }

        if (!formData.password) {
            validationErrors.password = 'Please fill out this field.';
        }

        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            signup(formData.email, formData.password);
        }
    };

    const signup = (email, password) => {
        axios
            .post(
                '/api/register',
                { email: email, password: password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                if (response.success) {
                    dispatch(actions.setLoggedIn(true));
                    navigate('/login');
                } else setMessage(response.message);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(email);
    };

    return (
        <div className="app-layout">
            <main className="main-page">
                <div className="auth-form">
                    <div className="auth-form-header">
                        <h3>Create an account</h3>
                        <h1>Music App OS X</h1>
                    </div>
                    {message ? (
                        <div className="auth-form-error">
                            <div className="error-message-container">{message}</div>
                            <button className="osx-btn" onClick={() => setMessage('')}>
                                <i className="icon">
                                    <svg
                                        aria-hidden="true"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        version="1.1"
                                        width="16"
                                        data-view-component="true"
                                        className="octicon octicon-x"
                                    >
                                        <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
                                    </svg>
                                </i>
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                    <div className="auth-form-body">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">
                                Email <span className="is-required"></span>
                            </label>
                            <input
                                className="form-control input-block"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <p className="error-message">
                                    {errors.email}
                                    <i className="icon">
                                        <svg
                                            aria-hidden="true"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            version="1.1"
                                            width="16"
                                            data-view-component="true"
                                            className="octicon octicon-x"
                                        >
                                            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
                                        </svg>
                                    </i>
                                </p>
                            )}
                            <label htmlFor="password">
                                Password <span className="is-required"></span>
                            </label>
                            <input
                                className="form-control input-block"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label htmlFor="confirmPassword">
                                Confirm password <span className="is-required"></span>
                            </label>
                            <input
                                className="form-control input-block"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && (
                                <p className="error-message">
                                    {errors.confirmPassword}
                                    <i className="icon">
                                        <svg
                                            aria-hidden="true"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            version="1.1"
                                            width="16"
                                            data-view-component="true"
                                            className="octicon octicon-x"
                                        >
                                            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
                                        </svg>
                                    </i>
                                </p>
                            )}
                            <button className="btn btn-primary btn-block sign-in-btn" type="submit">
                                Create an account
                            </button>
                        </form>
                    </div>
                    <p className="login-callout">
                        Already have an account? <a href="/login">Sign in.</a>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default SignUp;
