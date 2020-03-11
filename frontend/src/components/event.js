// JavaScript source code
import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Row, Col } from 'react-bootstrap';
import { CircularProgress } from '@material-ui/core';

const options = {
    selectableRows: 'none',  	// Hide the checkbox column
    elevation: 0,							// Shadow depth applied to Paper component
    searchPlaceholder: "Start typing keyword to search"
};

const columns = [
    {
        name: "name",
        label: "Event",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "date",
        label: "Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "location",
        label: "Venue",
        options: {
            filter: true,
            sort: true,
        }
    },

];

class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = { event: [], offline: false };
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
        fetch('/SCM/event/')
            .then(res => res.json())
            .then((data) => {
                var out = data._embedded.events;
                out.forEach(element => {
                    var location = element._embedded.venues[0].name;
                    var date = element.dates.start.localDate;
                    element.date = date;
                    element.location = location;
                });
                this.setState({ event: out, offline: false });
            })
            .catch(error => {
                this.setState({ offline: true });
            });

    }

    render() {
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col>
                        <h1 style={{ textAlign: 'center' }}>Events</h1>
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
                    this.state.event.length === 0 ?
                        <div>
                            <Row>
                                <Col></Col>
                                <Col style={{ textAlign: 'center' }}>
                                    <h3>Loading Data</h3>
                                    <CircularProgress size={24}
                                        thickness={4} />
                                </Col>
                                <Col></Col>
                            </Row>
                        </div>
                        :
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={""}
                                data={this.state.event}
                                columns={columns}
                                options={options}
                            />
                        </MuiThemeProvider>
                }

            </div>
        )
    }
};

export default Event;






