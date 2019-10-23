import * as React from 'react';
import { UserPage } from '../../views/user/userPage';
import { UserService } from '../../services/userService';
import { ProfileInformation, AccountInformation } from '../../interfaces/userPayloads';

interface State {
    profileInformation: ProfileInformation,
    accountInformation: AccountInformation,

    informationReady: boolean,
}

export class UserPageContainer extends React.Component<any, State> {

    userService: UserService;

    constructor(props) {
        super(props);

        this.state = {
            profileInformation: null,
            accountInformation: null,
            informationReady: null,
        }

        this.userService = new UserService();

        this.intializeUserPage();
    }

    intializeUserPage = async () => {

        const profileInformation = await this.userService.getProfileInformation();
        const accountInformation = await this.userService.getAccountInformation();

        this.setState({ profileInformation, accountInformation, informationReady: true });
    }

    updateProfileInformation = async (profileInformation: ProfileInformation) => {
        await this.userService.updateProfileInformation(profileInformation);
    }

    updateAccountInformation = (accountInformation: AccountInformation) => {

    }

    render() {
        const route = this.props.location.pathname;

        const { updateAccountInformation, updateProfileInformation } = this;
        const { profileInformation, accountInformation, informationReady } = this.state;

        if (informationReady) {
            return <UserPage route={route} profileInformation={profileInformation} accountInformation={accountInformation} updateAccountInformation={updateAccountInformation} updateProfileInformation={updateProfileInformation} />
        } else {
            return null
        }

    }
}