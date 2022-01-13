import { spawn } from 'redux-saga/effects'
import  {loginSaga} from './pages/login/login.saga'
// import accountSaga from './pages/account/account.saga'

export function* rootSaga(): any {
    yield spawn(loginSaga)
    // yield spawn(accountSaga)
}
