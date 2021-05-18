import React, { useState, useEffect } from 'react';   
import { AgGridReact } from 'ag-grid-react';   
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css'; 
import IconButton from '@material-ui/core/IconButton';  
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ShowExercise from './ShowExercise';
import moment from 'moment'; 
import SnackBar from '@material-ui/core/SnackBar'; 
import ShowChart from './ShowChart';

function ShowTrainings() { 
    
    const [trainings, setTraining] = useState([]); 
    const [msg, setMsg] = useState('');  
    const [open, setOpen] = useState(false);  
    const [customers, setCustomers] = useState([]);   

    useEffect(() => { 
        fetchTrainings();  
     }, [trainings]);  
    
     const fetchTrainings = () => { 
        fetch('https://customerrest.herokuapp.com/gettrainings',  {method: 'GET'})
        .then(response => response.json()) 
        .then(data => setTraining(data)) 
        .catch(err => console.err(err)) 
      }    

      const fetchCustomers = () => { 
        fetch('https://customerrest.herokuapp.com/api/customers') 
        .then(response => response.json()) 
        .then(data => setCustomers(data.content)) 
        .catch(err => console.err(err)) 
      }     

      const openSnackBar = () => { 
        setOpen(true);
      } 

      const closeSnackBar = () => { 
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
        //console.log(url);
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
        </div>
    );
} 

export default ShowTrainings;