import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PlateContext from './context'


function RemoveBtn(props) {
  const [open, setOpen] = React.useState(false);
  const message = `Remove plate ${props.data.plate} owned by ${props.data.owner_name}?`

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PlateContext.Consumer>
        {({ deletePlate }) => (
        <div>
            <Button onClick = {() => setOpen(true)} variant="contained" color="secondary">Delete</Button>
            <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
            <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={() => deletePlate(props.data.list_id)} color="primary" autoFocus>Confirm</Button>
            </DialogActions>
            </Dialog>
            </div>
        </div>
        )}
    </PlateContext.Consumer>
  )
}

export default RemoveBtn;