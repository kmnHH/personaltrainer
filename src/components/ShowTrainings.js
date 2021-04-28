import React, { useState, useEffect } from 'react';   
import { AgGridReact } from 'ag-grid-react';   
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css'; 
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
import ShowExercise from './ShowExercise';
import moment from 'moment';

function ShowTrainings() { 
    
    const [trainings, setTraining] = React.useState([]);

    useEffect(() => { 
        fetchTrainings(); 
     }, []);  
    
     const fetchTrainings = () => { 
        fetch('https://customerrest.herokuapp.com/gettrainings',  {method: 'GET'})
        .then(response => response.json()) 
        .then(data => setTraining(data)) 
        .catch(err => console.err(err)) 
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
  
    ]

    return (
        <div> 
            <h1>Trainings per date</h1>
            <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
                <AgGridReact 
                rowData={trainings} 
                columnDefs={columns} 
                pagination={true} 
                paginationPageSize={8} 
                floatingFilter={true} 
                suppressCellSelection={true}
                />
            </div>  
        </div>
    );
} 

export default ShowTrainings;