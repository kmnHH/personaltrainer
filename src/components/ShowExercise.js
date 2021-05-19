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
import DirectionsRunRoundedIcon from '@material-ui/icons/DirectionsRunRounded';

function ShowExercise(props) { 
    const [open, setOpen] = React.useState(false); 
    const [name, setName] = React.useState('Name empty');
    const [exercise, setExercise] = React.useState({
    duration: '',
    activity: '',
  }); 

  const handleClickOpen = () => { 
    setExercise({
      duration: props.exercise.duration,
      activity: props.exercise.activity,
    });
    setOpen(true); 
  }; 

  const handleClose = () => {
    setOpen(false);
  }; 

  //If customer has a firstname, then that name is used. If not, the name is 'Name empty'
  const giveName = () => {
    return (!props.exercise.customer.firstname ? name : props.exercise.customer.firstname);
  }

    return (
        <div> 
            <IconButton color="primary" onClick={handleClickOpen}>
                <DirectionsRunRoundedIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> 
                {giveName()}'s Exercise summary</DialogTitle> 
               
                <DialogContent>
                <TextField
                        margin="dense"
                        label="Activity"
                        name="activity"
                        value={exercise.activity}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Duration"
                        name="duration"
                        value={exercise.duration}
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

export default ShowExercise;