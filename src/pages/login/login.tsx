import './login.scss'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LoginActions } from './login.actions'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'

const initialState = {
    // name: 'admin',
    // password: 'admin'
    name: 'Hudi',
    password: 'Hudi'
}

function Login(props: any): JSX.Element {
    const history = useHistory()

    //console.log('LOGIN PROPS : ', props)

    const [state, setState] = useState(initialState)

    useEffect(() => {
        //console.log("LOGIN PROPS : ", props)
        if (props.login.foundUser && props.login.isAdmin) {
            history.push('/admin/users')
        }
        if (props.login.foundUser && !props.login.isAdmin) {
            history.push('/user')
        }
    }, [props.login])

    function handleInputChange(e: any, key: string): void {
        switch (key) {
            case 'username':
                setState({ ...state, name: e.target.value })
                break

            case 'password':
                setState({ ...state, password: e.target.value })
                break

            default:
                break
        }
    }

    function onLogin() {
        //console.log('ON LOGIN')
        props.loginRequest({ name: state.name, password: state.password })
    }

    return (
        <div className="pageCenter debug">
            <div className="loginContainer debug">
                <div className="loginTitle">Login</div>

                <div className="loginForm">
                    <label className="loginFormLabel ">User Name*</label>
                    <input className="loginInput" type="text" defaultValue="Hudi" onChange={e => handleInputChange(e, 'username')} />
                    <label className="loginFormLabel ">Password</label>
                    <input className="loginInput" type="password" defaultValue="Hudi" onChange={e => handleInputChange(e, 'password')} />

                    <div className="registerNow">
                        <a href="/register">Register Now</a>
                    </div>

                    <button className="loginBtn" onClick={onLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    ...state
})

const mapDispatchToProps = (dispatch: any) => ({ dispatch, ...bindActionCreators({ ...LoginActions }, dispatch) })

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(Login)
// conecteaza pagina la store, deci avem access la store
