import React from 'react';  
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone'; 
import IconButton from '@material-ui/core/IconButton';  
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";  


const AddExercice = (props) => {
    const [open, setOpen] = React.useState(false); 
    const [exercice, setExercice] = React.useState({
    date: new Date(), 
    duration: '', 
    activity: ''
    });   
    
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const inputChanged = (event) => {
        setExercice({...exercice, [event.target.name]: event.target.value});
      }  

      const handleDate = date => {
        setExercice({
          ...exercice,
          date: date
        });
      };  

      const handleCustomer = () => {
        const newExercice = { 
            ...exercice, date: exercice.date, 
            duration: exercice.duration, 
            activity: exercice.activity, 
            customer: props.customer.links[0].href
            };  
            handleSave(newExercice); 
          } 

      const handleSave = (newExercice) => { 
        props.addExercice(newExercice);
        setOpen(false);
      }; 

    return ( 
        <div> 
        <IconButton  variant="outlined" color="primary" onClick={handleClickOpen}>
            <AddCircleTwoToneIcon/> 
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new exercice for {props.customer.firstname}</DialogTitle>
                <DialogContent> 
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DateTimePicker
                            autoFocus
                            label="Date"
                            name="date"
                            value={exercice.date}
                            onChange={date => handleDate(moment(date).toISOString())}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        margin="dense"
                        label="Duration"
                        name="duration"
                        value={exercice.duration} 
                        onChange={inputChanged}
                        fullWidth
                    /> 
                    <TextField
                        margin="dense"
                        label="Activity"
                        name="activity"
                        value={exercice.activity} 
                        onChange={inputChanged}
                        fullWidth
                    /> 
                </DialogContent>
                <DialogActions> 
                    <Button onClick={handleCustomer} color="primary">
                        Save
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
} 

export default AddExercice;