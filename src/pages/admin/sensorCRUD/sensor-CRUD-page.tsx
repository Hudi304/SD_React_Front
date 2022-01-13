import { bindActionCreators } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { ExpadingMaterialTable } from '../../../common-components/components/custom-table/custom-table-component'
import { CustomToolbar } from '../../../common-components/components/custom-toolbar/custom-toolbar-cmp'
import { LoginActions } from '../../login/login.actions'
import { AddEditSensorDialog } from './add-edit-sensor/add-edit-sensor-dialog'
import './sensor-page-styles.scss'


//? 🔥 PUNE SLECTURILE IN CATE UN DIV CA CRED CA FACE GRID GAPUL DIFERENTA AIA 

const sensorColumns = [
  {
    title: 'SenDescr',
    field: 'description'
  }, {
    title: 'MaxVal',
    field: 'maximumValueMonitored'
  }, {
    title: 'DevId',
    field: 'deviceId'
  }, {
    title: 'DevDesc',
    field: 'deviceDecription'
  }
]

function SensorCRUD(props: any): JSX.Element {
  // console.log('Sensors : ', props)

  useEffect(() => {
    props.GET_Sensors()
    props.GET_Devices()
  }, [])

  return (
    <div className="adminPageContainer">
      <div className="adminToolBarContainer">
        <CustomToolbar />
      </div>

      <div className="adminTableContainer">
        <ExpadingMaterialTable
          tableTitle="Sensors"
          tableColumns={sensorColumns}
          tableData={props.login.admin?.sensors || []}
          remove={{
            message: `Are you sure you want to remove this sensor?`,
            action: sensor => {
              props.DELETE_Sensor({ id: sensor.id })
            }
          }}
          loading={props.login?.admin?.sensors == undefined}
          modalDialog={AddEditSensorDialog}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  ...state
})

const mapDispatchToProps = (dispatch: any) => ({
  dispatch,
  ...bindActionCreators({ ...LoginActions }, dispatch)
})

export const SensorCRUDPage = connect(mapStateToProps, mapDispatchToProps)(SensorCRUD)
