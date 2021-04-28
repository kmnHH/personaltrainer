import React, { useState, useEffect } from 'react';  
import { AgGridReact } from 'ag-grid-react';   
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css'; 
import ShowInfo from './ShowInfo'; 
import ShowTrainings from './ShowTrainings';


function Customers() {  
    const [customers, setCustomers] = useState([]); 
    
    useEffect(() => { 
        fetchCustomers(); 
     }, []);  

     const fetchCustomers = () => { 
        fetch('https://customerrest.herokuapp.com/api/customers') 
        .then(response => response.json()) 
        .then(data => setCustomers(data.content)) 
        .catch(err => console.err(err)) 
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
      
        
      ]

    return (
        <div> 
            <h1>All customers</h1>
            <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
                <AgGridReact 
                rowData={customers} 
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

export default Customers;