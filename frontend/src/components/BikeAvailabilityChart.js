import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BikeAvailabilityChart = (props) => {
    
    const options = {
        title: {
            text: 'Bikes Available at ' + props.stop + ' stop'
        },
        series: [{
            name: 'Bikes Available',
            data: props.bikeCount
        }],
        yAxis: [{
            title : {
                text: 'No of bikes available'
            }
        }],
        xAxis: [{
            title : {
                text: 'Hours'
            }
        }]
    };
    
    return (
        <div style={{margin:"5px", width:"100%"}}>
            <HighchartsReact highcharts = {Highcharts} options={options} />
        </div>
    );
};

export default BikeAvailabilityChart