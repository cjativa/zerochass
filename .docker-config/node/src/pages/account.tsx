import { UserLayout } from '../components/userLayout';

const Account = () => {

    const title = 'Account';
    const subtitle = 'Edit relevant account settings here.';

    return (
        <UserLayout title={title} subtitle={subtitle}>
            <div className="account">

                {/** Heading section */}
                <div className="account__heading">
                    <div className="form-field">
                        <label className="form-field__label">Email Address</label>
                        <input className="form-field__input" type="text" />
                    </div>
                </div>

                {/** Divider */}
                <hr className="divider" />

                {/** Rest of account information */}
                <div className="account__body">

                    {/** Password field */}
                    <div className="form-field">
                        <label className="form-field__label">Password</label>
                        <input className="form-field__input" type="password" />
                    </div>

                    {/** Confirm password field */}
                    <div className="form-field">
                        <label className="form-field__label">Confirm Password</label>
                        <input className="form-field__input" type="password" />
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

export async function getServerSideProps(ctx) {

    const protectPageWithAuthentication = (await import('../../server/api/middleware/protectedPage')).default;
    protectPageWithAuthentication(ctx);

    return {
        props: {}, // will be passed to the page component as props
    }
}

export default Account;