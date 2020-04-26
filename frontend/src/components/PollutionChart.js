import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PollutionChart = (props) => {

    const options = {
        chart: {
            backgroundColor: 'rgba(0,0,0,0)'
        },
        plotOptions: {
            series: {
                cursor: "pointer",
            }
        },
        title: {
            text: 'Pollution Level'
        },
        series: [{
            name: 'Level',
            data: props.polLevel,
            marker: { enabled:false }
        }],
        yAxis: [{
            title : {
                text: 'Pollution Level'
            }
        }],
        xAxis: [{
            title : {
                text: 'Day of the month'
            }
        }]

     };

    return (
        <div style={{margin:"5px", width:"100%"}}>
            <HighchartsReact highcharts = {Highcharts} options={options} />
        </div>
    );
};

export default PollutionChart