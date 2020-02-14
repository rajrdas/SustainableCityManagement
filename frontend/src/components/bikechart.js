import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from "react-fusioncharts";
import React from 'react';


charts(FusionCharts);

class Bikechart extends React.Component {
	
	constructor(props) {
        super(props);
        this.state = { bike: [] }
			  
	};
	componentDidMount() {
	fetch('/SCM/dubbike')
		.then(res => res.json())
		.then((data) => {
			this.setState({ bike: data });
			console.log(data)
		})
	}
	dostuff(){
		this.set = {
			datasource:{
				chart: {
					caption: "Bikes Availabe at each stand",
					yaxisname: "Stand Name",
					aligncaptionwithcanvas: "0",
					plottooltext: "<b>$dataValue</b> bikes available",
					theme: "fusion"
				},
				data: this.state.bike
			}
		}
		return(this.set.datasource)
	}

		
	
	render() {
	  return (
		<ReactFusioncharts
		  type="bar3d"
		  width="600"
		  height="550"
		  dataFormat="json"
		  dataSource={this.dostuff()}
		/>
	  );
	};
}
  
export default Bikechart;