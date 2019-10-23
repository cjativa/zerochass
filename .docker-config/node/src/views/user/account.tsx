import * as React from 'react';
import { AccountInformation } from '../../interfaces/userPayloads';

interface Props {
    accountInformation: AccountInformation,
    updateAccountInformation: (accountInformation: AccountInformation) => void
}
export class Account extends React.Component<Props> {

    constructor(props) {
        super(props);
    }

    onInputTextChange = (event) => {

        const { name, value } = event.target;

        this.setState((previousState) => {
            return {
                ...previousState,
                [name]: value
            }
        });
    }

    render() {

        const { onInputTextChange } = this;
        const { email } = this.props.accountInformation;

        return (
            <div className="account">
                <div className="top-box">
                    <h1>Account</h1>
                    <p>Edit relevant account settings here</p>
                </div>
                <div className="heading-box">
                    <div className="form-field">
                        <label>Email Address</label>
                        <input type="text" name="email" value={email} onChange={onInputTextChange}></input>
                    </div>
                </div>
                <div className="password-box">
                    <div className="form-field">
                        <label>Password</label>
                        <input type="password"></input>
                    </div>
                    <div className="form-field">
                        <label>Confirm Password</label>
                        <input type="password"></input>
                    </div>
                </div>
                <div className="save">
                    <button>Save</button>
                </div>
            </div>
        )
    }
}