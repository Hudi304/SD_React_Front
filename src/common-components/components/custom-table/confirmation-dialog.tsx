import React from 'react';
import { Button, DialogActions, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { MODAL_ACTIONS } from '../../modals/modal.types';

export const ConfirmationDialog = (props: any) => {

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({
      type: MODAL_ACTIONS.HIDE_MODAL
    });
  };

  const confirm = () => {
    props.action();
    dispatch({
      type: MODAL_ACTIONS.HIDE_MODAL
    });
  };

  return (
    <Dialog
      {...props.dialogDefaultSettings}
      onClose={handleClose}
      open={true}
    >
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        {props.message}
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={confirm}>
            Continue
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

