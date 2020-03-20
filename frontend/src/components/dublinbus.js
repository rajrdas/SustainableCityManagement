import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import BusTransitMap from './BusTransitMap';
import TransitMap from './TransitMap';
import '../utility/tabmanagement.css'

class DublinBus extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dublinbus: [], offline: false, originLatitude: "", originLongitude: "", destLatitude: "", destLongitude: "", showTransitMap: false };
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

    onRowClick = (rowData) => {
        this.setState({ originLatitude: rowData[2], originLongitude: rowData[3] });
    }

    open(e) {
        this.setState({ showModal: true });
    }

    close() {
        this.setState({ showModal: false });
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
        const options = {
            selectableRows: 'none',	// Hide the checkbox column
            elevation: 0, // Shadow depth applied to Paper component
            searchPlaceholder: "Start typing keyword to search",
            onRowClick: this.onRowClick
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
            },
            {
                name: "",
                label: "Transit Options",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div>
                                <Button className="buttonStyle" style={{ display: "inline-block" }} onClick={this.open.bind(this)}>Bus Stop Location/Transit Options on Map</Button>
                                <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            Bus Stop Location and Transit Option
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form style={{ margin: "5px" }}>
                                            <Row>
                                                <Col>
                                                    <h2>Origin</h2>
                                                </Col>
                                                <Col>
                                                    <h2>Destination</h2>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Latitude</Form.Label>
                                                </Col>
                                                <Col>
                                                    <Form.Label>Latitude</Form.Label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Control type="text" value={this.state.originLatitude} readOnly style={{ width: "150px" }} />
                                                </Col>
                                                <Col>
                                                    <Form.Control type="text" style={{ width: "150px" }} value={this.state.destLatitude} onChange={(e) => this.setState({ destLatitude: e.target.value })} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Longitude</Form.Label>
                                                </Col>
                                                <Col>
                                                    <Form.Label>Longitude</Form.Label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Control type="text" value={this.state.originLongitude} readOnly style={{ width: "150px" }} />
                                                </Col>
                                                <Col>
                                                    <Form.Control type="text" style={{ width: "150px" }} value={this.state.destLongitude} onChange={(e) => this.setState({ destLongitude: e.target.value })} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Button style={{ marginLeft: "13px" }} className="buttonStyle" onClick={() => this.setState({ showTransitMap: true })}>View Transportation Options</Button>
                                            </Row>
                                        </Form>
                                        <div>
                                            {
                                                this.state.showTransitMap === false ?
                                                    <TransitMap lat={this.state.originLatitude} long={this.state.originLongitude} />
                                                    :
                                                    null
                                            }
                                            {
                                                this.state.showTransitMap === true ?
                                                    <BusTransitMap originLat={this.state.originLatitude} originLong={this.state.originLongitude} destLat={this.state.destLatitude} destLong={this.state.destLongitude} />
                                                    :
                                                    null
                                            }
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        )
                    }
                }
            }
        ];

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