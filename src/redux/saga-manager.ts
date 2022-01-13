import { SagaMiddleware } from 'redux-saga'

import { loginSaga } from './../pages/login/login.saga'

export const sagas = [loginSaga]

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR'

const SagaManager = {
    startSagas(sagaMiddleware: SagaMiddleware) {
        sagas.forEach(saga => sagaMiddleware.run(saga))
    },

    cancelSagas(store) {
        store.dispatch({
            type: CANCEL_SAGAS_HMR
        })
    }
}

export default SagaManager
