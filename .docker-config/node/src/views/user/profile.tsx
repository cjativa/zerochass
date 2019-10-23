import * as React from 'react';
import { ProfileInformation } from '../../interfaces/userPayloads';

interface Props {
    profileInformation: ProfileInformation,
    updateProfileInformation: (profileInformation: ProfileInformation) => void,
}

interface State {
    heading: string,
    name: string,
    aboutMe: string,
    website: string,
}

export class Profile extends React.Component<Props, State> {

    constructor(props) {
        super(props);

        const { heading, name, aboutMe, website } = this.props.profileInformation;

        this.state = {
            heading,
            name,
            aboutMe,
            website
        };
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

    updateProfileInformation = () => {
        const { heading, name, aboutMe, website } = this.state;
        this.props.updateProfileInformation({ heading, name, aboutMe, website });
    }

    render() {

        const { onInputTextChange, updateProfileInformation } = this;
        const { heading, name, aboutMe, website } = this.state;

        return (
            <div className="profile">
                <div className="top-box">
                    <h1>Profile</h1>
                    <p>Welcome to your Zerochass profile</p>
                </div>
                <div className="heading-box">
                    <img className="user-picture"></img>
                    <div className="form-field">
                        <label>Heading</label>
                        <input type="text" name="heading" value={heading} onChange={onInputTextChange} placeholder="I'm a newbie software engineer"></input>
                    </div>
                </div>
                <div className="details-box">
                    <div className="form-field">
                        <label>Name</label>
                        <input type="text" name="name" value={name} onChange={onInputTextChange} placeholder="A name you go by"></input>
                    </div>
                    <div className="form-field">
                        <label>About me</label>
                        <textarea rows={4} maxLength={260} name="aboutMe" value={aboutMe} onChange={onInputTextChange} placeholder="A quick little snippet about you -- something like coffee afficionado on my journey to save our world from behind my desktop"></textarea>
                    </div>
                    <div className="form-field">
                        <label>Website</label>
                        <input type="text" name="website" value={website} onChange={onInputTextChange} placeholder="Enter your website URL here"></input>
                    </div>
                </div>
                <div className="save">
                    <button onClick={updateProfileInformation}>Save</button>
                </div>
            </div>
        )
    }
}