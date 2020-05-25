import { UserLayout } from '../components/userLayout';

const Profile = () => {

    const title = 'Profile';
    const subtitle = 'Welcome to your Zerochass profile';

    return (
        <UserLayout title={title} subtitle={subtitle}>
            <div className="profile">

                {/** Heading section */}
                <div className="profile__heading">
                    <img />
                    <div className="form-field">
                        <label className="form-field__label">Heading</label>
                        <input className="form-field__input" type="text" placeholder="I'm a newbie software engineer" />
                    </div>
                </div>

                {/** Divider */}
                <hr className="divider" />

                {/** Rest of profile information */}
                <div className="profile__body">

                    {/** Name field */}
                    <div className="form-field">
                        <label className="form-field__label">Name</label>
                        <input className="form-field__input" type="text" />
                    </div>

                    {/** About Me field */}
                    <div className="form-field">
                        <label className="form-field__label">About Me</label>
                        <textarea className="form-field__ta" placeholder="A quick little snippet about you -- something like coffee afficionado on my journey to save our world from behind my desktop" />
                    </div>

                    {/** Website field */}
                    <div className="form-field">
                        <label className="form-field__label">Website</label>
                        <input className="form-field__input" type="text" placeholder="Enter your website URL here" />
                    </div>

                    {/** Save */}
                    <div className="form-field">
                        <button className="form-field__button save">Save</button>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
};

export default Profile;