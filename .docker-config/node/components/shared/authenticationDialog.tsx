import { useState } from 'react';
import Modal from 'react-modal';


export const useAuthDialog = (): any => {

    /** Control the status of the dialog */
    const [isDialogOpen, setDialogOpen] = useState(false);

    /** Toggle the current status of the dialog */
    const toggle = () => setDialogOpen(!isDialogOpen); 

    /** Render the dialog */
    const dialog = () => {
        return (
            <AuthenticationDialog
            isOpen={isDialogOpen}
            onRequestClose={toggle}
            />
        )
    }


    return [isDialogOpen, setDialogOpen, toggle, dialog]
}


interface Props {
    isOpen: boolean,
    onRequestClose: any,
}

export const AuthenticationDialog = (props: Props) => {

    Modal.setAppElement('#__next');

    const customStyles = {
        overlay: {
            background: 'rgba(0, 0, 0, 0.685)',
            zIndex: '9999',
        }
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal-content"
        >
            <ModalContent onRequestClose={props.onRequestClose}></ModalContent>
        </Modal>
    )
};

interface ModalContentProps {
    onRequestClose: any
}

const ModalContent = (props: ModalContentProps) => {

    const { onRequestClose } = props;
    const highlightClass = 'current';

    let loginClass = highlightClass;
    let signUpClass = highlightClass;

    const onGitHubClick = () => {
        window.location.href =
            `https://github.com/login/oauth/authorize?scope=read:user%20user:email&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
    };

    return (
        <div className="modal-content">
            <i className={`fas fa-times`} onClick={() => onRequestClose()} />
            <div className="modal-content__inner">
                <p className="modal-content__title">
                    <span className={loginClass}>Sign In</span>
                    <span className="line" />
                    <span className={signUpClass}>Zerochass</span>
                </p>

                <div className="modal-content__text">
                    <p>Learn what interests you</p>
                    <p>quickly and intuitively.</p>
                </div>

                <div className="modal-content__buttons">
                    <button className="modal-content__sign-in" onClick={() => onGitHubClick()}>Log in with GitHub</button>
                    <button className="modal-content__sign-in">Log in with Twitter</button>
                </div>
            </div>
        </div>
    );
};
