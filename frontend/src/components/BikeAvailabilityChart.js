import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BikeAvailabilityChart = (props) => {
    var i =0 
    var arr =[]
    for(i=0; i <props.bikeCount.length; i++)
    {
        arr.push(props.bikeCount[i])
    }
    const options = {
        title: {
            text: 'Bikes Available at ' + props.stop + ' stop'
        },
        series: [{
            name: 'Bikes Available',
            data: arr
        }],
        yAxis: [{
            title : {
                text: 'Bikes Available'
            }
        }],
        xAxis: [{
            title : {
                text: 'Hours'
            }
        }]
    };
    
    return (
        <div style={{margin:"5px"}}>
            <HighchartsReact highcharts = {Highcharts} options={options} />
        </div>
    );
};

export default BikeAvailabilityChart