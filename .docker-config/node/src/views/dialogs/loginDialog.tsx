import * as React from 'react';
import { logIn } from '../../store/actions/authenticationActions';

interface State {
    username: string,
    password: string,
}

interface Props {
    closeDialog: () => void
}


class LoginDialog extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            username: null,
            password: null,
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const { username, password } = this.state;
        const { closeDialog } = this.props;

        const success = await logIn(username, password);
        closeDialog();
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
            <div className="login-dialog">
                <div className="login-grid">

                    {/* Dialog title */}
                    <span className="heading focused">Login <span className="divider">|</span> <span className="unfocused">Sign up</span></span>

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

export { LoginDialog };