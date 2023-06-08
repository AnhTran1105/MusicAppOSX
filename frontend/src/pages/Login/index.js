import { useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useStore, actions } from '../../store';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [state, dispatch] = useStore();

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password);
    };

    const login = (email, password) => {
        axios
            .post(
                '/api/login',
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
                    navigate('/');
                } else setError(response.message);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <main className="main-page">
            <div className="auth-form">
                <div className="auth-form-logo"></div>
                <div className="auth-form-header">
                    <h3>Sign in to</h3>
                    <h1>Music App OS X</h1>
                </div>
                {error ? (
                    <div className="auth-form-error">
                        <div className="error-message-container">{error}</div>
                        <button className="osx-btn" onClick={() => setError('')}>
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
                    <form acceptCharset="UTF-8" method="post" onSubmit={handleLogin}>
                        <label htmlFor="login_field">Email</label>
                        <input
                            type="text"
                            name="login"
                            id="login_field"
                            className="form-control form-control input-block js-password-field"
                            autoCapitalize="off"
                            autoCorrect="off"
                            autoComplete="off"
                            autoFocus="autofocus"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control input-block js-password-field"
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="btn btn-primary btn-block sign-in-btn" type="submit">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
                <p className="login-callout">
                    New to <b>Music App OS X?</b> <a href="/signup">Create an account.</a>
                </p>
            </div>
        </main>
    );
}

export default Login;
