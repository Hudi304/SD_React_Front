import { bindActionCreators } from '@reduxjs/toolkit'
import { useState } from 'react'
import { connect } from 'react-redux'
import { LoginActions } from '../login/login.actions'

import './register-page.scss'

const initialState = {
    name: '',
    email: '',
    password1: '',
    password2: ''
}

function Register(props: any): JSX.Element {
    //console.log('REGISTER props : ', props)

    const [state, setState] = useState(initialState)

    function handleInputChange(e: any, key: string): void {
        switch (key) {
            case 'name':
                setState({ ...state, name: e.target.value })
                break

            case 'email':
                setState({ ...state, email: e.target.value })
                break

            case 'password1':
                setState({ ...state, password1: e.target.value })
                break

            case 'password2':
                setState({ ...state, password2: e.target.value })
                break

            default:
                break
        }

        //console.log('input change state: ', state)
        //console.log('input change : ', e.target.value)
    }

    function onRegister() {
        if (state.email && state.name && state.password1 && state.password2 && state.password1 === state.password2) {
            //console.log(' registerRequest')

            props.registerRequest({ ...state })
        }
    }
    return (
        <div className="register-container debug">
            <div className="register-card debug">
                <div className="title debug">Register</div>

                <div className="register-form debug">
                    <label className="registerFormLabel">User Name</label>

                    <input className="registerInput" type="text" defaultValue={state.name} onChange={e => handleInputChange(e, 'name')} />

                    <label className="registerFormLabel">Email</label>

                    <input
                        className="registerInput"
                        type="email"
                        defaultValue={state.email}
                        onChange={e => handleInputChange(e, 'email')}
                    />

                    <label className="registerFormLabel">Password</label>

                    <input
                        className="registerInput"
                        type="password"
                        defaultValue={state.password1}
                        onChange={e => handleInputChange(e, 'password1')}
                    />

                    <label className="registerFormLabel">Retype Password</label>

                    <input
                        className="registerInput"
                        type="password"
                        defaultValue={state.password2}
                        onChange={e => handleInputChange(e, 'password2')}
                    />
                </div>

                <div className="register-btn-container">
                    <button
                        disabled={state.password1 == state.password2 && state.password1 != '' ? false : true}
                        className="register-btn"
                        onClick={onRegister}
                    >
                        Register
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

export const RegisterPage = connect(mapStateToProps, mapDispatchToProps)(Register)
// conecteaza pagina la store, deci avem access la store
