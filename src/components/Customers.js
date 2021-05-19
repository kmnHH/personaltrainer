import React, { useState, useEffect } from 'react';  
import { AgGridReact } from 'ag-grid-react';   
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css'; 
import IconButton from '@material-ui/core/IconButton'; 
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'; 
import Snackbar from '@material-ui/core/Snackbar'; 
import MuiAlert from '@material-ui/lab/Alert';  
import ShowInfo from './ShowInfo'; 
import ShowTrainings from './ShowTrainings';
import AddCustomer from './AddCustomer'; 
import AddExercice from './AddExercice'; 
import EditCustomer from './EditCustomer';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Customers() {  
    const [customers, setCustomers] = useState([]);   
    const [trainings, setTraining] = useState([]);  
    const [msg, setMsg] = useState(''); 
    const [open, setOpen] = useState(false); 

    useEffect(() => { 
        fetchCustomers();  
     }, []);   

     useEffect(() => { 
      fetchTrainings();
   }, []);  

     const fetchCustomers = () => { 
        fetch('https://customerrest.herokuapp.com/api/customers') 
        .then(response => response.json()) 
        .then(data => setCustomers(data.content)) 
        .catch(err => console.err(err)) 
      }     

      const fetchTrainings = () => { 
        fetch('https://customerrest.herokuapp.com/gettrainings',  {method: 'GET'})
        .then(response => response.json()) 
        .then(data => setTraining(data)) 
        .catch(err => console.err(err)) 
      }   
      
      const openSnackBar = () => { 
        setOpen(true);
      } 

      const handleClose = () => { 
        setOpen(false);
      }

      const columns = [ 
        { field: 'firstname', sortable: true, filter: true},
        { field: 'lastname', sortable: true, filter: true},  
        {
            headerName: 'Information', 
            field: '_links.href',  
            width: 120,
            cellRendererFramework: params => <ShowInfo customer={params.data} />
        },   
        { 
          headerName: 'Add exercice', 
          field: 'links.href',  
          width: 150, 
          cellRendererFramework: params => <AddExercice addExercice={addExercice} trainings={trainings} customer={params.data} />
      },
        { 
            headerName: '', 
            field: 'links.href',  
            width: 80, 
            cellRendererFramework: params => (<IconButton color="primary" 
            onClick={() => deleteCustomer(params.data.links[0].href)}><DeleteForeverRoundedIcon/></IconButton> )
        }, 
        { 
            headerName: '', 
            field: 'links.href',  
            width: 80, 
            cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} customer={params.data} />
        }, 
      ]    

      const editCustomer = (customer, href) => {
        fetch(href,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customer)
        })
          .then(_ => fetchCustomers())
          .catch(err => console.error(err));
      };

      const deleteCustomer = (params) => { 
        if (window.confirm('The decision is final if you delete. Do you want to continue?')) 
        {
            fetch(params, { method: 'DELETE' })
            .then(response => {
              if(response.ok) {
                fetchCustomers(); 
                openSnackBar(); 
                setMsg('Customer deleted successfully');
              }
              else {
                alert('Something went wrong in deletion'); 
              }
            })
            .catch(err => console.err(err))
          }
      }

      const addCustomer = (newC) => { 
        fetch('https://customerrest.herokuapp.com/api/customers',  
        {
            method: 'POST', 
            body: JSON.stringify(newC), 
            headers: { 'Content-type' : 'application/json' } 
        }) 
        .then(_ => fetchCustomers())   
        .then(openSnackBar())
        .then(setMsg('Customer added successfully'))
        .catch(err => console.error(err))
      }   

      const addExercice = (newE) => {  
        console.log(newE + "addaanExerciceee");
        fetch('https://customerrest.herokuapp.com/api/trainings',  
        {
          method: 'POST', 
          body: JSON.stringify(newE), 
          headers: { 'Content-type' : 'application/json' } 
        })  
        .then(_ => fetchCustomers()) 
        .catch(err => console.error(err))
      }  

    return (
        <div> 
            <h1>All customers</h1> 
            <AddCustomer addCustomer={addCustomer} />   
            <div className="ag-theme-material" style={{ height: 600, width: '70%', margin: 'auto' }}>
                <AgGridReact 
                rowData={customers} 
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

export default Customers;