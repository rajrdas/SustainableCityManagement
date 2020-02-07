// JavaScript source code
import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';



const options = {
    selectableRows: 'none',  	// Hide the checkbox column
    elevation: 0,							// Shadow depth applied to Paper component
    searchPlaceholder: "Start typing keyword to search"
};


const columns = [
    {
        name: "number",
        label: "Stand Number",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "name",
        label: "Stand Name",
        options: {
            filter: true,
            sort: false,
        }
    },
    //{
    //    name: "address",
    //    label: "Stand address",
    //    options: {
    //        filter: true,
    //        sort: false,
    //    }
    //},
    //{
    //    name: "position",
    //    label: "Position",
    //    options: {
    //        filter: true,
    //        sort: false,
    //    }
    //},
    {
        name: "bike_stands",
        label: "Total Bikes",
        options: {
            filter: true,
            sort: false,
        }
    },
    //{
    //    name: "available_bike_stands",
    //    label: "available bikes",
    //    options: {
    //        filter: true,
    //        sort: false,
    //    }
    //},
    //{
    //    name: "available_bike_stands",
    //    label: "available bikes stands",
    //    options: {
    //        filter: true,
    //        sort: false,
    //    }
    //},
    {
        name: "available_bikes",
        label: "Available Bikes",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "status",
        label: "Stand Status",
        options: {
            filter: true,
            sort: false,
        }
    },

    {
        name: "formattedTime",
        label: "Last Updated",
        options: {
            filter: true,
            sort: false,
        }
    },

    {
        name: "formattedTime",
        label: "Location",
        //template:<span>"Hi"</span>,
        options: {
            filter: true,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <button>View on Map</button>;
             }
        }
    },

];

class DublinBike extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dublinbike: [], offline: false };
    }

//    state = {
//        dublinbike: []
//    };

    getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTableHeadCell: {
                fixedHeaderCommon: {
                    "background-color": "#d8d8d8",
                    "font-weight": 1000,
                    "font-size": "medium"
                }
            }
        }
    })

    componentDidMount() {
        this.getData();
        this.interval = setInterval(() => this.getData(), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getData() {
        fetch('/SCM/dublinbike')
            .then(res => res.json())
            .then((data) => {
                //console.log(data);
                //console.log(data[0].last_update)
                data.forEach(element => {
                   //console.log(element)
                   
                   let unix_timestamp = element.last_update
                   // Create a new JavaScript Date object based on the timestamp
                   // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                   var date = new Date(unix_timestamp * 1000);
                   // Hours part from the timestamp
                   var hours = date.getHours();
                   // Minutes part from the timestamp
                   var minutes = "0" + date.getMinutes();
                   // Seconds part from the timestamp
                   var seconds = "0" + date.getSeconds();
                   
                   // Will display time in 10:30:23 format
                   var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                   element.formattedTime= formattedTime;
                });
                this.setState({ dublinbike: data, offline: false  });
            })
            .catch(error => {
                this.setState({ offline: true });
                });
        console.log(this.state.offline);
    }



    render() {
        return (
            <div>
                <center><h1>Dublin Bike</h1></center>
                <br />
                {this.state.offline ?
                    <div><center>
                        Connection to the server is broken. Data shown is the last updated data.
                    </center></div>
                 : "" }

                <br />
                <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                        title={""}
                        data={this.state.dublinbike}
                        columns={columns}
                        options={options}
                    />
                </MuiThemeProvider>

            </div>
        )
    }


};


export default DublinBike;






