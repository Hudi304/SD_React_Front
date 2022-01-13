import * as React from 'react'
import './modal.scss'
import { hot } from 'react-hot-loader'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'

const dialogDefaultSettings = {
    disableBackdropClick: true,
    disableEscapeKeyDown: true,
    maxWidth: 'md'
}

export const ModalRootComponent = (props: any) => {
    const [modals, setModals] = useState([])

    // console.log('MODAL ROOT COMPONENT PROPS : ', props)

    useEffect(() => {
        setModals(
            props.modals.openedModals.map((dialog, index) => {
                const SpecificModal = dialog.modalType
                // console.log('Specific Modal : ', SpecificModal)
                return <SpecificModal key={index} dialogDefaultSettings={dialogDefaultSettings} {...dialog.modalProps} />
            })
        )
    }, [props.modals.openedModals])

    return <div>{modals}</div>
}

const mapStateToProps = (state: any): any => ({
    ...state
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ...bindActionCreators({}, dispatch)
})

export const ModalRoot: any = hot(module)(connect(mapStateToProps, mapDispatchToProps)(ModalRootComponent))
