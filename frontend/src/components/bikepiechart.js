import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from "react-fusioncharts";
import React from 'react';

charts(FusionCharts);

class Bikepiechart extends React.Component {
	
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
					caption: "Bikes Usage",
                    defaultcenterlabel: "3510",
					aligncaptionwithcanvas: "0",
                    captionpadding: "0",
                    decimals: "1",
                    plottooltext:"<b>$dataValue</b> <b>$label</b>",
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
		return(this.set.datasource)
	}

		
	
	render() {
	  return (
		<ReactFusioncharts
		  type="doughnut2d"
		  width="400"
		  height="400"
		  dataFormat="json"
		  dataSource={this.dostuff()}
		/>
	  );
	};
}
  

export default Bikepiechart;