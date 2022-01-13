import { ModalState, MODAL_ACTIONS } from './modal.types'
import { Reducer } from 'redux'
import { MyAction } from '../../redux'

const defaultModalState = {
    modalType: null,
    modalProps: {},
    openedModals: []
}

export const ModalReducer: Reducer<ModalState> = (state: ModalState = defaultModalState, action: MyAction<any>) => {
    switch (action.type) {
        case MODAL_ACTIONS.SHOW_MODAL:
            // console.log('REDUCER SHOW MODAL : ', action.payload)
            return {
                openedModals: [
                    ...state.openedModals,
                    {
                        modalType: action.payload.modalType,
                        modalProps: action.payload.modalProps
                    }
                ]
            }
        case MODAL_ACTIONS.HIDE_MODAL:
            return {
                openedModals:
                    state.openedModals.length > 1 && action.payload.modalType
                        ? state.openedModals.filter(item => item.modalType !== action.payload.modalType)
                        : []
            }
        default:
            return state
    }
}
