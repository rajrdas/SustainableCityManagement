import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

class MapContainer extends React.Component {

	render() {
	    return (
	        <Map
	          google={this.props.google}
	          zoom={12}
	          style={mapStyles}
	          initialCenter={{ lat: 53.3498, lng: -6.2603}}    //centre at Dublin 
	        >
	            <Marker position={{ lat: 53.344250, lng: -6.262410}} />
			</Map>
	    );
	  }

};

export default GoogleApiWrapper({
apiKey: 'AIzaSyDlqp_xDwz-gGxa4BfprQ_cyl98Obgdc6w'
})(MapContainer);