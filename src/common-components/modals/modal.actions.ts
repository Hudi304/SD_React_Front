import { MyAction } from '../../redux'
import { MODAL_ACTIONS } from './modal.types'

export namespace ModalActions {
    export const showModal = (data): MyAction<any> => {
        // console.log('ACTIONS : OPEN MODAL')
        return {
            type: MODAL_ACTIONS.SHOW_MODAL,
            payload: data
        }
    }

    export const hideModal = (data): MyAction<any> => ({
        type: MODAL_ACTIONS.HIDE_MODAL,
        payload: data
    })
}
