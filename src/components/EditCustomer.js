import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import IconButton from '@material-ui/core/IconButton'; 
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';


const EditCustomer = (props) => { 
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: '',
    }); 

    const handleClickOpen = () => { 
        setCustomer({
        firstname: props.customer.firstname,
        lastname: props.customer.lastname,
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

    const handleInputChange = event => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }; 

    const editCustomer = () => { 
        props.editCustomer(customer, props.customer.links[0].href); 
        handleClose();
    }

    return (
        <div> 
            <IconButton color="primary" onClick={handleClickOpen}>
                <EditTwoToneIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit {props.customer.firstname} `s information</DialogTitle>
                <DialogContent>
                <TextField
                        margin="dense"
                        label="Firstname"
                        name="firstname"
                        value={customer.firstname} 
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    /> 
                    <TextField
                        margin="dense"
                        label="Lastname"
                        name="lastname"
                        value={customer.lastname} 
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Streetaddress"
                        name="streetaddress"
                        value={customer.streetaddress} 
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode} 
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        name="city"
                        value={customer.city} 
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        value={customer.email} 
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        name="phone"
                        value={customer.phone} 
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Back
                    </Button> 
                    <Button onClick={editCustomer} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
} 

export default EditCustomer;