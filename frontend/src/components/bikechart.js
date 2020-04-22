import React from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import DublinBikeClusters from './DublinBikeClusters';
import BikeAvailabilityChart from './BikeAvailabilityChart';
import '../utility/tabmanagement.css'

class Bikechart extends React.Component {

	constructor(props) {
		super(props);
		this.state = { clusterDict: [], selectedColumn: "" }

	};

	componentDidMount() {
        this.getBikeClusters();
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


	render() {
		return (
			<div>
				<Tabs defaultActiveKey="bikeChart" id="dublinBikeTab">
					<Tab eventKey="bikeChart" title="Available Bikes Prediction">
						<Row style={{ margin: "5px" }}>
							<Col md="auto">
								<label htmlFor="bikeStop">Select a Bike Stop</label>
							</Col>
							<Col>
								<p style={{ textAlign: "center", color: "red" }}>Due to the COVID19 PANDEMIC, bike predictions might vary a little.</p>
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
				</Tabs>
			</div>
		)
	};
}

export default Bikechart;