import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Row, Col } from 'react-bootstrap';
import { CircularProgress } from '@material-ui/core';

import log from 'loglevel';
import remote from 'loglevel-plugin-remote';

const customJSON = log.message


log.enableAll();

remote.apply(log, {url: '/SCM/loggerFrontend/' });

// log.info('Inside pollution js');
// log.warn('warn message from pollution');

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


class Pollution extends React.Component {

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
               // this.setState({ pol: data.aqihsummary, offline: false });
               this.setState({ pol: data, offline: false });
            })
            .catch(error => {
                log.error(error);
                this.setState({ offline: true });
            });
        console.log(this.state.offline);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col>
                        <h1 style={{ textAlign: 'center' }}>Pollution</h1>
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
                    this.state.pol.length === 0 ?
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
                                data={this.state.pol}
                                columns={columns}
                                options={options}
                            />
                        </MuiThemeProvider>
                }

            </div>
        )
    }
};

export default Pollution;