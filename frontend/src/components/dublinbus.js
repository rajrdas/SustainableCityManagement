import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

const options = {
    selectableRows: 'none',	// Hide the checkbox column
    elevation: 0, // Shadow depth applied to Paper component
    searchPlaceholder: "Start typing keyword to search"
};
const columns = [
    {
        name: "stopid",
        label: "Stop ID",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "fullname",
        label: "Stop Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "latitude",
        label: "Latitude",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "longitude",
        label: "Longitude",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "name",
        label: "Bus Operators",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "operatortype",
        label: "Operator Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "routes",
        label: "Routes",
        options: {
            filter: true,
            sort: true,
        }
    }
];

class DublinBus extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dublinbus: [], offline: false };
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
        fetch('/SCM/dublinbus/')
            .then(res => res.json())
            .then((data) => {
                var out = data.results;
                out.forEach(element => {
                    var name = element.operators[0].name
                    var operatortype = element.operators[0].operatortype
                    var allroutes = element.operators[0].routes
                    element.name = name;
                    element.operatortype = operatortype
                    var routes = ""
                    allroutes.forEach(element => {
                        routes = routes + element + " "
                    })
                    element.routes = routes
                });
                this.setState({ dublinbus: out, offline: false });
            })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col>
                        <h1 style={{ textAlign: 'center' }}>Dublin Bus</h1>
                    </Col>
                    <Col></Col>
                </Row>
                {
                    this.state.offline ?
                        <div style={{ textAlign: 'center' }}>
                            Connection to the server is broken. Data shown is the last updated data.
                        </div>
                        : ""
                }
                {
                    this.state.dublinbus.length === 0 ?
                        <Row>
                            <Col></Col>
                            <Col style={{ textAlign: 'center' }}>
                                <h3>Loading Data</h3>
                                <CircularProgress size={24}
                                    thickness={4} />
                            </Col>
                            <Col></Col>
                        </Row>
                        :
                        <Row>
                            <Col>
                                <MuiThemeProvider theme={this.getMuiTheme()}>
                                    <MUIDataTable
                                        title={""}
                                        data={this.state.dublinbus}
                                        columns={columns}
                                        options={options}
                                    />
                                </MuiThemeProvider>
                            </Col>
                        </Row>
                }

            </div>
        )
    }
};

export default DublinBus;