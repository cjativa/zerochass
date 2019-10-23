import * as React from 'react';

export class Connect extends React.Component {

    render() {
        return (
            <div className="connect">
                <div className="top-box">
                    <h1>Connect</h1>
                    <p>Link accounts to your profile and expand your network</p>
                </div>
                <div className="form-field">
                    <label>GitHub</label>
                    <button>Connect your GitHub account</button>
                </div>
                <div className="form-field">
                    <label>LinkedIn</label>
                    <button>Connect your LinkedIn account</button>
                </div>
                <div className="form-field">
                    <label>Twitter</label>
                    <button>Connect your Twitter account</button>
                </div>
                <div className="save">
                    <button>Save</button>
                </div>
            </div>
        )
    }
}