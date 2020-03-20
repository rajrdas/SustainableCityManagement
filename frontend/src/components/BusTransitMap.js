import React from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, TrafficLayer } from "react-google-maps";

var originLat = 0
var originLong = 0
var destLat = 0
var destLong = 0

const BusTransitMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDlqp_xDwz-gGxa4BfprQ_cyl98Obgdc6w&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({

        componentDidMount() {
            const DirectionsService = new window.google.maps.DirectionsService();
            DirectionsService.route({
                origin: new window.google.maps.LatLng(originLat, originLong),
                destination: new window.google.maps.LatLng(destLat, destLong),
                travelMode: window.google.maps.TravelMode.TRANSIT,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(props =>
    <div style={{ visibility: "hidden" }}>
        {
            destLat = parseFloat(props.destLat)
        }
        {
            destLong = parseFloat(props.destLong)
        }
        {
            originLat = props.originLat
        }
        {
            originLong = props.originLong
        }
        <GoogleMap
            defaultZoom={8}
            defaultCenter={new window.google.maps.LatLng(parseFloat(props.originLat), parseFloat(props.originLong))}>
            <DirectionsRenderer directions={props.directions} />
            <TrafficLayer autoUpdate />
        </GoogleMap>
    </div>
);

export default BusTransitMap;
