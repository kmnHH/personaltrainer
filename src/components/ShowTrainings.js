import React, { useState, useEffect } from 'react';   
import { AgGridReact } from 'ag-grid-react';   
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css'; 
import IconButton from '@material-ui/core/IconButton';  
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ShowExercise from './ShowExercise';
import moment from 'moment'; 
import Snackbar from '@material-ui/core/Snackbar'; 
import ShowChart from './ShowChart'; 
import MuiAlert from '@material-ui/lab/Alert';   

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 
const ShowTrainings = () => {
    const [trainings, setTrainings] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
      if (trainings.length === 0) {
        fetchTrainings();
      }
     }, [trainings]);  
 
     const fetchTrainings = () => { 
        fetch('https://customerrest.herokuapp.com/gettrainings',  { method: 'GET' })
        .then((response) => response.json()) 
        .then((data) => {
          setTrainings(data)
        })
        .catch((err) => console.err(err));
      };
 
      const openSnackBar = () => { 
        setOpen(true);
      } 
 
      const handleClose = () => { 
        setOpen(false);
      }
     
      const columns = [ 
        { headerName : 'Date', field: 'date', cellRenderer: (data) => { return moment(data.value).format("MM/DD/YYYY HH:mm");}, sortable: true, filter: true},
        { headerName : 'Firstname', field: 'customer.firstname', sortable: true, filter: true}, 
        { headerName : 'Lastname', field: 'customer.lastname', sortable: true, filter: true},   
        {
            headerName: 'Exercise', 
            field: '_links.href',  
            width: 120,
            cellRendererFramework: params => <ShowExercise exercise={params.data} />
       },  
       {
        headerName: '', 
        field: '_links.href',  
        width: 120, 
        cellRendererFramework: params => (<IconButton color="primary" 
        onClick={() => deleteExercice("https://customerrest.herokuapp.com/api/trainings/" + params.data.id)}><DeleteForeverRoundedIcon/></IconButton> )
        }, 
      ]  
 
      const deleteExercice = (params) => { 
        console.log(params);
        if (window.confirm('The decision is final if you delete. Do you want to continue?')) 
        {
            fetch(params, { method: 'DELETE' })
            .then(response => {
              if(response.ok) {
                fetchTrainings(); 
                openSnackBar(); 
                setMsg('Exercise deleted successfully');
              }
              else {
                alert('Something went wrong in deletion'); 
              }
            })
            .catch(err => console.err(err))
          }
      }
 
    return (
        <div> 
            <h1>Exercises per date</h1>
             <ShowChart trainings={trainings} />
            <div className="ag-theme-material" style={{ height: 600, width: '70%', margin: 'auto' }}>
                <AgGridReact 
                rowData={trainings} 
                columnDefs={columns} 
                pagination={true} 
                paginationPageSize={8} 
                floatingFilter={true} 
                suppressCellSelection={true}
                />
            </div>   
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                {msg}
              </Alert> 
            </Snackbar>
        </div>
    );
} 
 
export default ShowTrainings;