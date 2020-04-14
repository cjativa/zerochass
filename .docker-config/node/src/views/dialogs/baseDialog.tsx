import * as React from 'react';
import Modal from 'react-modal';


interface Props {
    open: boolean,
    closeDialog: () => void,
    Dialog: any
}

Modal.setAppElement('#app');

class BaseDialog extends React.Component<Props, any> {

    render() {

        const { open, closeDialog, Dialog } = this.props;


        return (
            <Modal isOpen={open} onRequestClose={closeDialog} className="base-dialog" overlayClassName="modal-overlay">
                {Dialog}
            </Modal>
        )
    }
}

export { BaseDialog };
