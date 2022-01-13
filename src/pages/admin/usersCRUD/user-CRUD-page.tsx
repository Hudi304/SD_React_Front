import { useEffect, useMemo, useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'

import { connect, useDispatch } from 'react-redux'
import { CustomToolbar } from '../../../common-components/components/custom-toolbar/custom-toolbar-cmp'
import { LoginActions } from '../../login/login.actions'
import { AddEditUserDialog } from './add-edit-user-dialog/add-edit-user-dialog-component'
import './admin.scss'
import MaterialTable from 'material-table'
import { MODAL_ACTIONS } from '../../../common-components/modals/modal.types'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { ExpadingMaterialTable } from '../../../common-components/components/custom-table/custom-table-component'

const userColumns = [
  {
    title: 'Name',
    field: 'username'
  },
  {
    title: 'Password',
    field: 'password'
  },
  {
    title: 'BirthDate',
    field: 'birthDate'
  },
  {
    title: 'Address',
    field: 'address'
  }
]

function UserCRUD(props: any): JSX.Element {

  // console.log("UserCURD : props : ", props)
  useEffect(() => {
    props.GET_Users()
    props.GET_Devices()
  }, [])

  return (
    <div className="adminPageContainer">
      <div className="adminToolBarContainer">
        <CustomToolbar />
      </div>

      <div className="adminTableContainer">
        <div className="root">
          <ExpadingMaterialTable
            tableTitle="Users"
            tableColumns={userColumns}
            tableData={props.login.admin?.users || []}
            remove={{
              message: `Are you sure you want to remove this user?`,
              action: user => {
                props.DELETE_User({ id: user.id })
              }
            }}
            loading={props.login?.admin?.users == undefined}
            modalDialog={AddEditUserDialog}
          />
        </div>
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

export const UserCRUDPage = connect(mapStateToProps, mapDispatchToProps)(UserCRUD)
