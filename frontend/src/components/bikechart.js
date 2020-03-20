import React from 'react';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from "react-fusioncharts";
import { CircularProgress } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';


charts(FusionCharts);

class Bikechart extends React.Component {

	constructor(props) {
		super(props);
		this.state = { bike: [] }

	};
	componentDidMount() {
		fetch('/SCM/biketrend')
			.then(res => res.json())
			.then((data) => {
				this.setState({ bike: data });
			})
	}
	showBikeChart() {
		this.set = {
			datasource: {
				chart: {
					caption: "Bikes Available at each stand",
					yaxisname: "Stand Name",
					aligncaptionwithcanvas: "0",
					plottooltext: "<b>$dataValue</b> bikes available",
					theme: "fusion"
				},
				data: this.state.bike
			}
		}
		return (this.set.datasource)
	}

	showBikePieChart() {
		this.set = {
			datasource: {
				chart: {
					caption: "Bikes Usage",
					defaultcenterlabel: "3510",
					aligncaptionwithcanvas: "0",
					captionpadding: "0",
					decimals: "1",
					plottooltext: "<b>$dataValue</b> <b>$label</b>",
					centerlabel: "# Users: $value",
					theme: "fusion"
				},
				data: [
					{
						label: "Available Bikes",
						value: "1174"

					},
					{
						label: "Bikes in use",
						value: "2336"
					}
				]
			}
		}
		return (this.set.datasource)
	}

	render() {
		if (this.showBikeChart().data.length === 0 || this.showBikePieChart().data === 0) {
			return (
				<Row>
					<Col></Col>
					<Col style={{ textAlign: 'center' }}>
						<h3>Loading Chart Data</h3>
						<CircularProgress size={24}
							thickness={4} />
					</Col>
					<Col></Col>
				</Row>
			);
		}
		else {
			return (
				<div>
					<Row>
						<Col>
							<ReactFusioncharts
								type="bar3d"
								width="600"
								height="550"
								dataFormat="json"
								dataSource={this.showBikeChart()}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<ReactFusioncharts
								type="doughnut2d"
								width="400"
								height="400"
								dataFormat="json"
								dataSource={this.showBikePieChart()}
							/>
						</Col>
					</Row>
				</div>
			);
		}
	};
}

export default Bikechart;