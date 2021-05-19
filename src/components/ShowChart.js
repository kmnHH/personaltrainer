import React, { useState } from 'react';   
import Chart from "react-google-charts";
import IconButton from '@material-ui/core/IconButton';  
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';  
import Dialog from '@material-ui/core/Dialog';  
import Button from '@material-ui/core/Button'; 
import _ from "lodash";
 
const ShowChart = ({ trainings }) => {
    const [open, setOpen] = useState(false);  
    const [results, setResult] = useState([]);
 
    const groupObjects = () => {
        const data = _(trainings)
        .groupBy('activity')
        .map((activities, act) => {
          return { 
            activity: act,
            duration: _.map(activities, 'duration')
          };
        }).value();  
        setResult(data); 
    }; 
 
    const handleClickOpen = () => {
        setOpen(true); 
        groupObjects();
    };
 
    const handleClose = () => {
        setOpen(false);
    };
 
    const getDurationSum = (duration = []) => {
        return duration.reduce((sum, value) => sum + value, 0);
    };
 
    const getActivityData = (data) => {
        return data.reduce((acc, item) => {
            const { activity, duration } = item;
            const durationSum = getDurationSum(duration);
 
            return [...acc, [activity, durationSum]];
        }, [['Activity', 'Minutes']]);
    };
 
    return (
        <>  
            <IconButton variant="outlined" color="primary" onClick={() => handleClickOpen()}>
                <AddCircleTwoToneIcon/> Show chart
            </IconButton> 
            <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title">
                {trainings.length > 0 ? (
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={getActivityData(results)}
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
                ) : <p>Loading...</p>}
            <Button onClick={() => handleClose()} color="primary">
                Back
            </Button>
            </Dialog>
        </>
    );
};
 
export default ShowChart;