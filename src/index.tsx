import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'

import { configureStore } from './redux'
import { Router, Route, Switch } from 'react-router-dom'
import { MainComponent } from './main/main'

export const history = createBrowserHistory()

export const store = configureStore()

ReactDOM.render(
    //? SOME WEIRD WARNING
    <React.Suspense fallback={null}>
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route path={'/'} component={MainComponent} />
                </Switch>
            </Router>
        </Provider>
    </React.Suspense>,
    document.getElementById('root')
)
