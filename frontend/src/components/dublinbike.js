import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Row, Col, Button, Modal, Tabs, Tab } from 'react-bootstrap';
import { CircularProgress } from '@material-ui/core';
import TransitMap from './TransitMap';
import DublinBikeClusters from './DublinBikeClusters';
import '../utility/tabmanagement.css'
import BikeAvailabilityChart from './BikeAvailabilityChart';

class DublinBike extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dublinbike: [], offline: false, latitude: "", longitude: "", clusterDict: [], selectedColumn: "" };
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
        this.getBikeClusters();
        this.interval = setInterval(() => this.getData(), 120000);
        this.setState({ selectedColumn: "BOLTON STREET" })
    }

    handleChange(e) {


        this.setState({ selectedColumn: e.target.value });
        this.getBikeAvailabilityChart();
    }

    getBikeAvailabilityChart() {
        var data = require('../utility/BikeAvailability.json');
        var bikeCount = []
        var i = 0;
        for (i = 0; i < data.length; i++) {
            bikeCount.push(data[i][this.state.selectedColumn])
        }

        return <BikeAvailabilityChart bikeCount={bikeCount} stop={this.state.selectedColumn} />
    }
    getBikeClusters() {

        var data = require('../utility/clusters.json');
        var i = 0

        for (i = 0; i < data.length; i++) {
            if (data[i].Cluster === 1) {
                data[i].Color = 'http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=50&text=•&scale=1';
            } else {
                data[i].Color = 'http://mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1';
            }
        }
        var cluster = []
        cluster.push(data)

        this.setState({ clusterDict: cluster });

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getData() {
        fetch('/SCM/dublinbike')
            .then(res => res.json())
            .then((data) => {
                data.forEach(element => {

                    let unix_timestamp = element.last_update
                    // Create a new JavaScript Date object based on the timestamp
                    var date = new Date(unix_timestamp);
                    // Hours part from the timestamp
                    var hours = date.getHours();
                    // Minutes part from the timestamp
                    var minutes = "0" + date.getMinutes();
                    // Seconds part from the timestamp
                    var seconds = "0" + date.getSeconds();

                    // Will display time in 10:30:23 format
                    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                    element.formattedTime = formattedTime;
                    var lat = element.position.lat;
                    var long = element.position.lng;
                    element.long = long;
                    element.lat = lat;
                });
                this.setState({ dublinbike: data, offline: false });
            })
            .catch(error => {
                this.setState({ offline: true });
            });
    }

    onRowClick = (rowData) => {

        this.setState({ latitude: rowData[2], longitude: rowData[3] });
    }

    open(e) {
        this.setState({ showModal: true });
    }

    close() {
        this.setState({ showModal: false });
    }

    render() {
        const options = {
            selectableRows: 'none', // Hide the checkbox column
            elevation: 0, // Shadow depth applied to Paper component
            searchPlaceholder: "Start typing keyword to search",
            onRowClick: this.onRowClick
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
            {
                name: "lat",
                label: "Latitude",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "long",
                label: "Longitude",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "bike_stands",
                label: "Total Bikes",
                options: {
                    filter: true,
                    sort: false,
                }
            },
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
                name: "",
                label: "Bike Stand Location on Map",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div>
                                <Button className="buttonStyle" style={{ display: "inline-block" }} onClick={this.open.bind(this)}>View Bike Stand Location</Button>
                                <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            Bike Stand Location with Traffic in Nearby Areas
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <TransitMap lat={this.state.latitude} long={this.state.longitude} defaultZoom={14}/>
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
                <Tabs defaultActiveKey="dublinBike" id="dublinBikeTab">
                    <Tab eventKey="dublinBike" title="Dublin Bikes">
                        <Row>
                            <Col></Col>
                            <Col>
                                <h1 style={{ textAlign: 'center' }}>Dublin Bike</h1>
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
                            this.state.dublinbike.length === 0 ?
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
                                        data={this.state.dublinbike}
                                        columns={columns}
                                        options={options}
                                    />
                                </MuiThemeProvider>
                        }
                    </Tab>
                    <Tab eventKey="clusters" title="Dublin Bike Clusters">
                        <div>
                            <Row style={{ margin: "5px" }}>
                                <h3>Legend</h3>
                            </Row>
                            <Row style={{ margin: "5px" }}>
                                <img src='http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=50&text=•&scale=1' alt="Cluster 1" />
                                <h4 style={{ marginLeft: "5px" }}> - People riding bikes from these particular stops to Dublin City Center</h4>
                            </Row>
                            <Row style={{ margin: "5px" }}>
                                <img src='http://mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png&scale=1' alt="Cluster 2" />
                                <h4 style={{ marginLeft: "5px" }}> - People riding bikes from these particular stops to areas other than Dublin City Center</h4>
                            </Row>
                        </div>
                        <DublinBikeClusters clusterDict={this.state.clusterDict} />
                    </Tab>
                    <Tab eventKey="bikeChart" title="Available Bikes Prediction">
                        <Row style={{ margin: "5px" }}>
                            <Col md="auto">
                                <label htmlFor="bikeStop">Select a Bike Stop</label>
                            </Col>
                            <Col>
                                <p style={{ textAlign: "center", color: "red" }}>Due to the COVID-19 PANDEMIC, bike predictions might vary a little.</p>
                            </Col>
                            <Col md="auto"></Col>
                        </Row>
                        <Row style={{ margin: "5px" }}>
                            <select id="cars" style={{ borderRadius: "5px", border: "1px solid black" }} value={this.state.selectedColumn}
                                onChange={this.handleChange.bind(this)} >
                                <option value="BOLTON STREET">BOLTON STREET</option>
                                <option value="PARNELL SQUARE NORTH">PARNELL SQUARE NORTH</option>
                                <option value="PEARSE STREET">PEARSE STREET</option>
                                <option value="CUSTOM HOUSE">CUSTOM HOUSE</option>
                                <option value="HANOVER QUAY">HANOVER QUAY</option>
                                <option value="KILMAINHAM GAOL">KILMAINHAM GAOL</option>
                                <option value="TALBOT STREET">TALBOT STREET</option>
                                <option value="HEUSTON STATION (CENTRAL)">HEUSTON STATION (CENTRAL)</option>
                                <option value="HIGH STREET">HIGH STREET</option>
                                <option value="DAME STREET">DAME STREET</option>
                            </select>
                        </Row>
                        <Row>
                            {this.getBikeAvailabilityChart()}
                        </Row>
                    </Tab>
                </Tabs>
            </div>
        )
    }
};

export default DublinBike;