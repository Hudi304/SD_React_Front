import { createStore, Store, Action, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import promise from 'redux-promise-middleware'
import { routerMiddleware } from 'react-router-redux'


import SagaManager from './saga-manager'
import reducers from './reducers'
import { ModalState } from '../common-components/modals/modal.types'
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */

export interface AppState {
    modal?: ModalState;
    admin?: any;
    login?: any;
}

export interface MyAction<T> extends Action<string> {
    payload?: T
}

const history = createBrowserHistory()

export { history }

const initialState = {}

export const configureStore = (): Store<AppState> => {
    const sagaMiddleware = createSagaMiddleware()
    const routerMiddlewareHistory = routerMiddleware(history)
    const middleware = [promise, sagaMiddleware, routerMiddlewareHistory]
    const enhanced = [applyMiddleware(...middleware)]
    const store = createStore(reducers, initialState, compose(...enhanced))
    SagaManager.startSagas(sagaMiddleware)

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(require('./reducers').default)
        })
        module.hot.accept('./saga-manager', () => {
            SagaManager.cancelSagas(store)
            require('./saga-manager').default.startSagas(sagaMiddleware)
        })
    }

    return store
}
