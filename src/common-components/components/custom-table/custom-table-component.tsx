import MaterialTable from '@material-table/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { MODAL_ACTIONS } from '../../modals/modal.types'
import { ConfirmationDialog } from './confirmation-dialog'

export interface ExpadingMaterialTable {
  isEditable?: boolean
  isDeletable?: boolean
  permissions?: number[]
  modalDialog?: any
  remove?: {
    message?: string
    action?: any
  }
  tableTitle: string
  tableColumns: any[]
  tableData: any[]
  loading?: any
  extraActions?: any
  extraData?: any
}
export const ExpadingMaterialTable = (props: ExpadingMaterialTable) => {
  const dispatch = useDispatch()

  // console.log('EXPANDING MATERIAL TABLE PROPS  : ', props)

  const state = React.useMemo(
    () => ({
      actions: [
        {
          icon: 'add_circle',
          tooltip: 'Add',
          hidden: false,
          isFreeAction: true,
          onClick: event => {
            // console.log('MAT TABLE OPEN MODAL')
            dispatch({
              type: MODAL_ACTIONS.SHOW_MODAL,
              payload: {
                modalType: props.modalDialog,
                modalProps: { licenses: props.extraData }
              }
            })
          }
        },
        {
          icon: 'edit',
          tooltip: 'Edit',
          hidden: false,
          onClick: (event, rowData) => {
            // console.log('row data ',rowData)
            dispatch({
              type: MODAL_ACTIONS.SHOW_MODAL,
              payload: {
                modalType: props.modalDialog,
                modalProps: { dialogModel: rowData }
              }
            })
          }
        },
        {
          icon: 'delete_outline',
          tooltip: 'Delete',
          hidden: false,
          onClick: (event, rowData) => {
            dispatch({
              type: MODAL_ACTIONS.SHOW_MODAL,
              payload: {
                modalType: ConfirmationDialog,
                modalProps: {
                  dialogModel: rowData,
                  message: props.remove?.message,
                  action: () => {
                    props.remove?.action(rowData)
                  }
                }
              }
            })
          }
        }
      ],
      options: {
        actionsColumnIndex: -1,
        grouping: true
      },
      columns: [
        {
          title: 'No',
          render: (row: any) => row.tableData.id + 1,
          sorting: false,
          width: 7,
          grouping: false
        }
      ]
    }),
    [props]
  )
  return (
    <div className="root">
      <MaterialTable
        title={props.tableTitle}
        data={props.tableData}
        columns={[...state.columns, ...props.tableColumns]}
        isLoading={props.loading}
        actions={
          props.extraActions
            ? state.actions.concat(props.extraActions)
            : state.actions
        }
        options={state.options}
      />
    </div>
  )
}
