import * as React from 'react';
import { Link } from 'react-router-dom';

interface State {
    username: string,
    password: string,
}


class Login extends React.Component<any, State> {

    onSubmit = (event) => {
        event.preventDefault();

    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {

        const { onSubmit, onPasswordChange, onUsernameChange } = this;

        return (
            <div className="base-authentication-page">
                <div className="grid login-grid">

                    {/* Dialog title */}
                    <span className="heading"><Link to="/login">Login</Link><span className="divider">|</span><Link to="/sign-up" className="unfocused">Sign up</Link></span>

                    {/* Dialog content */}
                    <span className="subtitle">Welcome back, you.</span>

                    {/* Login form */}
                    <form noValidate onSubmit={onSubmit} className="login-form">

                        {/* Username label and field */}
                        <div className="form-field">
                            <label className="label">Username</label>
                            <input className="textfield" onChange={onUsernameChange} id="username" />
                        </div>

                        {/* Password label and field */}
                        <div className="form-field">
                            <label className="label">Password</label>
                            <input className="textfield" onChange={onPasswordChange} id="password" type="password" />
                            <a className="forgot-password" href="#">Forgot your password?</a>
                        </div>

                        {/* Login button*/}
                        <div className="form-field span-down">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export { Login };