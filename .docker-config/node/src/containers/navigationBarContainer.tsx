import * as React from 'react';
import { connect } from "react-redux";

import { ConnectedProps } from "interfaces/connectedProps";
import { ZerochassStoreInterface } from 'store/reducers/topReducers';

import { NavigationBar } from 'views/shared/navigationBar';

interface MappedProps {
    signedIn: boolean,
    name: string,
}

type Props = MappedProps & ConnectedProps;

class NavigationBarContainer extends React.Component<Props> {

    render() {

        console.log('Rendering');

        const { signedIn, name } = this.props;

        return (
            <NavigationBar signedIn={signedIn} name={name} />
        )
    }
}

const mapStateToProps = (state: ZerochassStoreInterface) => {

    const { signedIn } = state.UserState.authentication;
    const { name } = state.UserState.profile;

    return { name, signedIn };
}

export const ConnectedNavigationBarContainer = connect(mapStateToProps)(NavigationBarContainer);