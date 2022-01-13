import * as React from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators, Dispatch } from 'redux'
import { connect, useDispatch } from 'react-redux'
import { Snackbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import CloseIcon from '@material-ui/icons/Close'
import { SNACK_ACTIONS } from './snack.types'

export const SnackRootComponent = (props: any) => {
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch({
            type: SNACK_ACTIONS.HIDE_SNACK
        })
    }

    if (!props.message) {
        return null
    }

    return (
        <div className="snack-bar">
            <Snackbar
                open={true}
                onClose={handleClose}
                autoHideDuration={6000}
                action={
                    props.type === 'fail' ? (
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" color="error" />
                        </IconButton>
                    ) : (
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <DoneAllIcon fontSize="small" color="primary" />
                        </IconButton>
                    )
                }
                message={props.message}
            ></Snackbar>
        </div>
    )
}

const mapStateToProps = (state: any): any => ({
    ...state.snack
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ...bindActionCreators({}, dispatch)
})

export const SnackRoot: typeof SnackRootComponent = hot(module)(connect(mapStateToProps, mapDispatchToProps)(SnackRootComponent))
