import React, { useState, useEffect } from 'react';   
import Chart from "react-google-charts";
import IconButton from '@material-ui/core/IconButton';  
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';  
import Dialog from '@material-ui/core/Dialog';  
import Button from '@material-ui/core/Button'; 
import _ from "lodash"; 
import groupBy from "lodash";  
import sumBy from "lodash";



const ShowChart = (props) => {
    const [open, setOpen] = useState(false);  
    const [trainings, setTraining] = useState([]);
    const [group, setGroup] = useState([]); 
    const [results, setResult] = useState([]);  
    const chartMockData = [  
        ['Activity', 'Minutes'], 
        //[results[0].activity, 10], 
        ["Spinning", 10],  
        ["Running", 20], 
        
    ];

    useEffect(() => { 
        fetchTrainings();  
     }, []);  
    
     const fetchTrainings = () => { 
        fetch('https://customerrest.herokuapp.com/gettrainings',  {method: 'GET'})
        .then(response => response.json()) 
        .then(data => setTraining(data)) 
        .catch(err => console.err(err)) 
      }    


    const groupObjects = () => {
        const result = _(trainings)
        .groupBy('activity')
        .map(function(items, act) {
          return { 
            activity: act,
            duration: _.map(items, 'duration')
          };
        }).value();  
        setResult(result); 
    }; 
     
    const handleClickOpen = () => {
        setOpen(true); 
        groupObjects();
    };
            
    const handleClose = () => {
        setOpen(false);
    };  

    const getActivityData = (data) => {
        if(data.length === 0) { 
            return chartMockData;
        }  

        data.map((activity) => { 
            console.log(activity);


        })
    }

    if (results && results.length > 0) { 
        console.log(results);
    }

        return (
                <div>  
                    <IconButton  variant="outlined" color="primary" onClick={handleClickOpen}>
                        <AddCircleTwoToneIcon/> Show chart
                    </IconButton> 
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        /*data={[  
                            ['Activity', 'Minutes'], 
                            //[results[0].activity, 10], 
                            ["Spinning", 10],  
                            ["Running", 20], 
                            
                        ]} */ 
                        data={ !results || results.length === 0 ? 
                            chartMockData :
                            getActivityData(results)
                        }
                    
                        options={{
                            title: 'Duration per activity',
                            chartArea: { width: '50%' },
                            hAxis: {
                                title: 'Total Duration in minutes',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Activity',
                            },
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '1' }}
                    /> 


                    <Button onClick={handleClose} color="primary">
                        Back
                    </Button>
                    </Dialog>
                  </div>
              )
            } 
            export default ShowChart;