export const MODAL_ACTIONS = {
    SHOW_MODAL: "SHOW_MODAL",
    HIDE_MODAL: "HIDE_MODAL"
};

export interface ModalState {
    openedModals: any[];
}

export interface ModalDispatchProps {
    showModal?: any;
    hideModal?: any;
}

export interface ModalProps extends ModalState, ModalDispatchProps { }
