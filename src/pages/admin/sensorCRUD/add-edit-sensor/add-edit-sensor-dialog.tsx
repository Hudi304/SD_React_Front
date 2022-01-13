import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'

import { Formik, Form, FormikProps } from 'formik'
import { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import FormikInputField from '../../../../common-components/formik-components/formik-base-imput-field'
import { LoginActions } from '../../../login/login.actions'
import { connect, useDispatch } from 'react-redux'

import './add-edit-sensor-dialog-styles.scss'
import { MODAL_ACTIONS } from '../../../../common-components/modals/modal.types'
import Select from 'react-select'

const initilaState = {
  description: '',
  maximumValueMonitored: ''
}

export function AddEditSensor(props: any): JSX.Element {
  const [state, setState] = useState(props.dialogModel || initilaState)
  const dispatch = useDispatch()
  const [devices, setDevices] = useState([])

  // console.log('ADD EDIT SENSOR PROPS : ', props)


  const dialogModel = props.dialogModel


  const saveOrEditSensor = () => {

    if (props.dialogModel) {
      const editRequest = {
        id: props.dialogModel.id,
        description: state.description,
        maximumValueMonitored: state.maximumValueMonitored,
        deviceId: state.device.value,
      }

      props.EDIT_Sensor(editRequest)
    } else {
      const addRequest = {
        description: state.description,
        maximumValueMonitored: state.maximumValueMonitored
      }
      props.ADD_Sensor(addRequest)
      handleClose()
    }

  }

  useEffect(() => {
    setDevices(props.login.admin?.devices)
  }, [])

  function devicesToOptions() {
    return devices?.map((device: any) => ({
      ...device,
      label: device.description,
      value: device.id
    }))
      .filter(device => device.sensorId == -1)
  }

  function handleClose() {
    dispatch({
      type: MODAL_ACTIONS.HIDE_MODAL
    })
  }

  return (
    <Dialog
      open={true}
      PaperProps={{
        style: {
          border: '2px solid',
          borderColor: '#0000FF'
        }
      }}
    >
      <DialogTitle>Add Users</DialogTitle>
      <DialogContent
        style={{
          height: 'auto',
          margin: '0px'
        }}
      >
        <Formik initialValues={initilaState} onSubmit={saveOrEditSensor} enableReinitialize>
          {(props: FormikProps<any>) => (
            <Form noValidate className="flex">
              <div className="modelContainer">
                <FormikInputField
                  as={TextField}
                  name="description"
                  label="Description"
                  variant="standard"
                  value={state.description}
                  onChange={e => {
                    setState({ ...state, description: e.target.value })
                  }}
                />

                <FormikInputField
                  as={TextField}
                  name="maximumValueMonitored"
                  label="Maximum Value Monitored"
                  variant="standard"
                  value={state.maximumValueMonitored}
                  onChange={e => {
                    setState({
                      ...state,
                      maximumValueMonitored: e.target.value
                    })
                  }}
                />

                {!dialogModel ? null : (
                  <Select
                    name="colors"
                    options={devicesToOptions()}
                    className="multiSelectDevice"
                    classNamePrefix="select"
                    onChange={e => {
                      // console.log("e : ", e)
                      setState({ ...state, device: { label: e.description, value: e.id } })
                    }}
                  />
                )}
              </div>

              <DialogActions style={{}}>
                <Button autoFocus onClick={() => handleClose()} color="primary">
                  {'CANCEL'}
                </Button>

                <Button autoFocus onClick={() => saveOrEditSensor()}
                  color="primary">
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

export const AddEditSensorDialog = connect(mapStateToProps, mapDispatchToProps)(AddEditSensor)
