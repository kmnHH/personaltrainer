import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import EditIcon from '@material-ui/icons/Edit'; 
import IconButton from '@material-ui/core/IconButton'; 
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

function ShowInfo(props) { 
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: '',
  }); 

  

  const handleClickOpen = () => { 
    setCustomer({
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone,
    });
    setOpen(true);
  }; 

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <div> 
            <IconButton color="primary" onClick={handleClickOpen}>
                <InfoOutlinedIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.customer.firstname} `s information</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Streetaddress"
                        name="streetaddress"
                        value={customer.streetaddress}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        name="city"
                        value={customer.city}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        value={customer.email}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        name="phone"
                        value={customer.phone}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Back
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
} 

export default ShowInfo;