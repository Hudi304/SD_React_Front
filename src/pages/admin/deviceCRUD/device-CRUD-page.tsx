import { bindActionCreators } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { ExpadingMaterialTable } from '../../../common-components/components/custom-table/custom-table-component'
import { CustomToolbar } from '../../../common-components/components/custom-toolbar/custom-toolbar-cmp'
import { LoginActions } from '../../login/login.actions'
import { AddEditDeviceDialog } from './add-edit-device/add-edit-device-dialog'

import './device-page.scss'

const deviceColumns = [
  {
    title: 'description',
    field: 'description'
  },
  {
    title: 'address',
    field: 'address'
  },
  {
    title: 'MaxCon',
    field: 'maxConsumption'
  },
  {
    title: 'AvgCon',
    field: 'avgConsumption'
  },
  {
    title: 'UseName',
    field: 'username'
  },
  {
    title: 'UseID',
    field: 'userId'
  }
]

function DeviceCRUD(props: any): JSX.Element {
  useEffect(() => {
    props.GET_Devices()
    props.GET_Users()
    props.GET_Sensors()
  }, [])

  console.log('devices : Props : ', props)

  return (
    <div className="adminPageContainer">
      <div className="adminToolBarContainer">
        <CustomToolbar />
      </div>

      <div className="adminTableContainer">
        <ExpadingMaterialTable
          tableTitle="Devices"
          tableColumns={deviceColumns}
          tableData={props.login.admin?.devices || []}
          remove={{
            message: `Are you sure you want to remove this device?`,
            action: device => {
              props.DELETE_Device({ id: device.id })
            }
          }}
          loading={props.login?.admin?.devices == undefined}
          modalDialog={AddEditDeviceDialog}
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

export const DeviceCRUDPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceCRUD)
