import React from 'react';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {

    onSubmit = (event) => {
        event.preventDefault();
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {

        const { onUsernameChange, onEmailChange, onPasswordChange, onSubmit } = this;
        
        return (
            <div className="base-authentication-page">
                <div className="grid sign-up-grid">

                    {/* Dialog title */}
                    <span className="heading"><Link to="/login" className="unfocused">Login</Link><span className="divider">|</span><Link to="/sign-up">Sign up</Link></span>

                    {/* Dialog content */}
                    <span className="subtitle">Learn what interests you <br />
                        quickly and intuitively.</span>

                    {/* Sign up form */}
                    <form noValidate onSubmit={onSubmit} className="sign-up-form">

                        {/* Username label and field */}
                        <div className="form-field">
                            <label className="label">Username</label>
                            <input className="textfield" onChange={onUsernameChange} id="username" />
                        </div>


                        {/* Email label and field */}
                        <div className="form-field">
                            <label className="label">Email Address</label>
                            <input className="textfield" onChange={onEmailChange} id="email" />
                        </div>


                        {/* Password label and field */}
                        <div className="form-field">
                            <label className="label">Password</label>
                            <input className="textfield" onChange={onPasswordChange} id="password" type="password" />
                        </div>

                        {/* Sign up button */}
                        <div className="form-field span-down">
                            <button type="submit">Sign up</button>
                            <span className="tou-info">By signing up, you agree to our Terms of Use, and our Privacy Policy</span>
                        </div>
                    </form>


                </div>
            </div>
        )
    }
}

export { SignUp };