import * as React from 'react';
import { Link } from 'react-router-dom';


export class UserMenu extends React.Component {

    render() {
        return (
            <div className="user-button">
                <div className="dropdown">
                    <span><i className="fas fa-user-circle"></i></span>
                    <div className="dropdown-content">
                        <Link to="/user/profile">Profile</Link>
                        <Link to="/user/account">Account</Link>
                        <Link to="/user/connect">Connect</Link>
                    </div>
                </div>
            </div>
        )
    }
}