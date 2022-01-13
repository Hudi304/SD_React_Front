import { Redirect, Route, useHistory } from 'react-router-dom'
import { ModalRoot } from '../common-components/modals/modal'
import { DeviceCRUDPage } from '../pages/admin/deviceCRUD/device-CRUD-page'
import { SensorCRUDPage } from '../pages/admin/sensorCRUD/sensor-CRUD-page'
import { UserCRUDPage } from '../pages/admin/usersCRUD/user-CRUD-page'
import { LoginPage } from '../pages/login/login'
import { RegisterPage } from '../pages/register/register-page'
import { AppState } from '../redux'
import { connect } from 'react-redux'

import { bindActionCreators, Dispatch } from 'redux'
import { LoginActions } from '../pages/login/login.actions'
import { hot } from 'react-hot-loader'
import { useEffect } from 'react'
import { UserPage } from '../pages/user/user-page'

function MainPage(props: any): any {
    const history = useHistory()

    useEffect(() => {
        if (props.login.foundUser == true && props.login.isAdmin == true) {
            history.push("/admin/users")
        }
        if (props.login.foundUser == true && props.login.isAdmin == false) {
            history.push("/user")
        }
        if (props.login.foundUser == false && props.login.isAdmin == false ||
            props.login.foundUser == false && props.login.isAdmin == true) {
            history.push("/login")
        }
        console.log("MAIN PAGE PROPS : ", props)
    }, [])
    return (
        <div>
            <div>
                <Route exact path={'/login'} component={() => <LoginPage />} />
                <Route exact path="/register" component={RegisterPage} />

                <Route exact path="/user" component={UserPage} />


                <Route exact path="/admin/users" component={UserCRUDPage} />
                <Route exact path="/admin/devices" component={DeviceCRUDPage} />
                <Route exact path="/admin/sensors" component={SensorCRUDPage} />

                <Route path={'/*'}>
                    <Redirect to="/login" />
                </Route>
            </div>
            <ModalRoot />
        </div>
    )
}

const mapStateToProps = (state: AppState): any => ({
    admin: state.admin,
    login: state.login,
    modal: state.modal
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ...bindActionCreators({ ...LoginActions }, dispatch)
})

export const MainComponent: typeof MainPage = hot(module)(connect(mapStateToProps, mapDispatchToProps)(MainPage))
