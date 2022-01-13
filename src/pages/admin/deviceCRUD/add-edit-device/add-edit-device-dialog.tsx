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
import { bindActionCreators } from 'redux'
import FormikInputField from '../../../../common-components/formik-components/formik-base-imput-field'
import { LoginActions } from '../../../login/login.actions'
import { connect, useDispatch } from 'react-redux'
import Select from 'react-select'

import './add-edit-device-styles.scss'
import { MODAL_ACTIONS } from '../../../../common-components/modals/modal.types'

const initilaState = {
  description: '',
  address: '',
  maxConsumption: '',
  avgConsumption: ''
}

function AddEditDevice(props): JSX.Element {
  const [state, setState] = useState(props.dialogModel || initilaState)

  const dispatch = useDispatch()

  const [devices, setDevices] = useState([])
  const [users, setUsers] = useState([])
  const [sensors, setSensors] = useState([])

  const { dialogModel } = props


  const { row } = props

  useEffect(() => {
    setDevices(props.login.admin?.devices)
    setUsers(props.login.admin?.users)
    setSensors(props.login.admin?.sensors)

    if (props.dialogModel) {
      setState({ ...state, user: { label: props.dialogModel.username, value: props.dialogModel.userId } })
    }
  }, [])

  function usersToOptions() {
    return users?.map((user: any) => {
      return { ...user, label: user.username, value: user.id }
    })
  }

  function sensorsToOptions() {
    return sensors?.map((sensor: any) => {
      return { ...sensor, label: sensor.description, value: sensor.id }
    })
  }

  // console.log("ADD EDIT DEVICE DIALOG MODEL", props)

  const saveOrEditDevice = () => {

    if (props.dialogModel) {
      // console.log("edit device ")
      const editRequest = {
        id: props.dialogModel.id,
        description: state.description,
        address: state.address,
        maxConsumption: state.maxConsumption,
        avgConsumption: state.avgConsumption,
        userId: state.user?.value,
        sensorId: state.sensor?.value
      }
      props.EDIT_Device(editRequest)

    } else {
      const addRequest = {
        description: state.description,
        address: state.address,
        maxConsumption: state.maxConsumption,
        avgConsumption: state.avgConsumption
      }
      props.ADD_Device(addRequest)
    }

  }

  function handleClose() {
    dispatch({
      type: MODAL_ACTIONS.HIDE_MODAL
    })
  }

  return (
    <Dialog
      onClose={handleClose}
      open={true}
      PaperProps={{
        style: {
          border: '2px solid',
          borderColor: '#0000FF'
        }
      }}
    >
      <DialogTitle>{`${props.dialogModel ? 'Edti' : 'Add'} Devices`}</DialogTitle>
      <DialogContent
        style={{
          height: 'auto',
          margin: '0px'
        }}
      >
        <Formik
          initialValues={initilaState}
          onSubmit={saveOrEditDevice}
          enableReinitialize
        >
          {(props: FormikProps<any>) => (
            <Form noValidate className="flex">
              <div className="modelContainer">
                <FormikInputField
                  as={TextField}
                  name="description"
                  label="Description"
                  variant="outlined"
                  value={state.description}
                  onChange={e => {
                    setState({ ...state, description: e.target.value })
                  }}
                />

                <FormikInputField
                  as={TextField}
                  name="address"
                  label="Address"
                  variant="outlined"
                  value={state.address}
                  onChange={e => {
                    setState({ ...state, address: e.target.value })
                  }}
                />


                <FormikInputField
                  as={TextField}
                  name="maxConsumption"
                  label="Max Consumption"
                  variant="outlined"
                  value={state.maxConsumption}
                  onChange={e => {
                    setState({ ...state, maxConsumption: e.target.value })
                  }}
                />

                <FormikInputField
                  as={TextField}
                  name="avgConsumption"
                  label="Averege Consumption"
                  variant="outlined"
                  value={state.avgConsumption}
                  onChange={e => {
                    setState({ ...state, avgConsumption: e.target.value })
                  }}
                />

                {!dialogModel ? null : (
                  <Select
                    name="colors"
                    value={state.user || null}
                    options={usersToOptions()}
                    className="multiSelectDevice"
                    classNamePrefix="select"
                    onChange={e => {
                      // console.log("CHANGE USER ", e)
                      setState({ ...state, user: { label: e.username, value: e.id } })
                    }}
                  />
                )}

                {!dialogModel ? null : (
                  <Select
                    name="colors"
                    options={sensorsToOptions()}
                    className="multiSelectDevice"
                    classNamePrefix="select"
                    onChange={e => {
                      // console.log("CHANGE SENSOR : ", e)
                      setState({ ...state, sensor: { label: e.description, value: e.id } })
                    }}
                  />
                )}
              </div>

              <DialogActions style={{}}>
                <Button autoFocus onClick={handleClose} color="primary">
                  {'CANCEL'}
                </Button>

                <Button autoFocus onClick={saveOrEditDevice} color="primary">
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

const mapStateToProps = (state: any) => ({
  ...state
})

const mapDispatchToProps = (dispatch: any) => ({
  dispatch,
  ...bindActionCreators({ ...LoginActions }, dispatch)
})

export const AddEditDeviceDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditDevice)
