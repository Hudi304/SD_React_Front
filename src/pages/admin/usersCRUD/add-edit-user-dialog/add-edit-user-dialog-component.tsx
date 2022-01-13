import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'

import { Formik, Form, FormikProps } from 'formik'
import { useEffect, useState } from 'react'
import FormikInputField from '../../../../common-components/formik-components/formik-base-imput-field'
import { LoginActions } from '../../../login/login.actions'
import { connect } from 'react-redux'

import { bindActionCreators, Dispatch } from 'redux'

import { useDispatch } from 'react-redux'

import './add-edit-user-dialog.scss'
import Select from 'react-select'
import { AppState } from '../../../../redux'
import { hot } from 'react-hot-loader'
import { MODAL_ACTIONS } from '../../../../common-components/modals/modal.types'

const initilaState = {
  username: '',
  password: '',
  password2: '',
  birthDate: '',
  address: ''
}

function AddEditUser(props: any): any {
  const [state, setState] = useState(props.dialogModel || initilaState)
  const dispatch = useDispatch()
  const { dialogModel } = props

  const [devices, setDevices] = useState([])
  const [userDevices, setUserDevices] = useState(props.dialogModel?.devices?.map((device) => ({
    ...device, label: device.description,
    value: device.id
  })))


  function devicesToOptions() {
    return devices?.map((device: any) => ({
      ...device,
      label: device.description,
      value: device.id
    })).filter(device => device.userId == -1)
  }

  useEffect(() => {
    setDevices(props?.login?.admin?.devices)
  }, [])

  useEffect(() => {
    setState({ ...state, devices: devicesToOptions })
  }, [devices])

  function handleClose() {
    dispatch({
      type: MODAL_ACTIONS.HIDE_MODAL
    })
  }

  const saveOrEditUser = () => {
    if (props.dialogModel) {
      // console.log('EDIT : state', state)

      const editRequest = {
        id: props.dialogModel.id,
        name: state.username,
        password: state.password,
        dateOfBirth: state.birthDate,
        address: state.address,
        deviceIds: state.deviceIds
      }

      props.EDIT_User(editRequest)
    } else {
      const addRequest = {
        name: state.username,
        password: state.password,
        dateOfBirth: state.birthDate,
        address: state.address
      }
      props.ADD_User(addRequest)
    }
  }


  return (
    <Dialog
      onClose={handleClose}
      open={true}
      PaperProps={{
        style: {
          border: '2px solid',
          width: '700px',
          minWidth: '700px'
        }
      }}
    >
      <DialogTitle> {`${dialogModel ? 'Edti' : 'Add'} Users`}</DialogTitle>
      <DialogContent
        style={{
          height: 'auto',
          margin: '0px'
        }}
      >
        <Formik
          initialValues={initilaState}
          onSubmit={saveOrEditUser}
          enableReinitialize
        >
          {(props: FormikProps<any>) => (
            <Form noValidate className="flex">
              <div className="modelContainer">
                <FormikInputField
                  as={TextField}
                  name="resourceNumber"
                  label="User Name"
                  variant="outlined"
                  value={state.username}
                  onChange={e => {
                    setState({ ...state, username: e.target.value })
                  }}
                />

                <FormikInputField
                  as={TextField}
                  name="Date Of Birth"
                  label="Date Of Birth"
                  variant="outlined"
                  value={state.birthDate}
                  onChange={e => {
                    setState({ ...state, birthDate: e.target.value })
                  }}
                />

                <FormikInputField
                  as={TextField}
                  name="resourceNumber"
                  label="Password"
                  variant="outlined"
                  value={state.password}
                  onChange={e => {
                    setState({ ...state, password: e.target.value })
                  }}
                />
                {dialogModel ? null : (
                  <FormikInputField
                    as={TextField}
                    name="resourceNumber"
                    label="Retype Password"
                    variant="outlined"
                    value={state.password2}
                    onChange={e => {
                      setState({ ...state, password2: e.target.value })
                    }}
                  />
                )}

                {!dialogModel ? null : (
                  <Select
                    isMulti
                    defaultValue={userDevices}
                    name="colors"
                    options={devicesToOptions()}
                    className="multiSelectDevice"
                    classNamePrefix="select"
                    onChange={e => {
                      const deviceIds: any = e.map(item => item.id)
                      setState({ ...state, deviceIds })
                    }}
                  />
                )}

                <FormikInputField
                  as={TextField}
                  name="Date Of Birth"
                  label="Address"
                  variant="outlined"
                  value={state.address}
                  onChange={e => {
                    setState({ ...state, address: e.target.value })
                  }}
                />
              </div>

              <DialogActions style={{}}>
                <Button autoFocus onClick={() => handleClose()} color="primary">
                  {'CANCEL'}
                </Button>

                <Button autoFocus type="submit" color="primary">
                  {'SAVE'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = (state: AppState): any => ({
  modal: state.modal,
  login: state.login
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators({ ...LoginActions }, dispatch)
})

export const AddEditUserDialog: typeof AddEditUser = hot(module)(
  connect(mapStateToProps, mapDispatchToProps)(AddEditUser)
)
