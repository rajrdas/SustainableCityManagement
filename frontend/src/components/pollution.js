import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const options = {
    selectableRows: 'none',	// Hide the checkbox column
    elevation: 0, // Shadow depth applied to Paper component
    searchPlaceholder: "Start typing keyword to search"
};

const columns = [
    {
        name: "aqih-region",
        label: "Area",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "aqih",
        label: "Status",
        options: {
            filter: true,
            sort: false,
        }
    }
];

class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pol: [], offline: false };
    }

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
        fetch('/SCM/pollution/')
            .then(res => res.json())
            .then((data) => {
                //console.log(data[0].last_update)
                this.setState({ pol: data.aqihsummary, offline: false });
            })
            .catch(error => {
                this.setState({ offline: true });
            });
        console.log(this.state.offline);
    }

    render() {
        return (
            <div>
                <center><h1>Pollution</h1></center>
                <br />
                {this.state.offline ?
                    <div><center>
                        Connection to the server is broken. Data shown is the last updated data.
                    </center></div>
                    : ""}

                <br />
                <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                        title={""}
                        data={this.state.pol}
                        columns={columns}
                        options={options}
                    />
                </MuiThemeProvider>

            </div>
        )
    }
};

export default Event;










