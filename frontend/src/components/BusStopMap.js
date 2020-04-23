import React from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, TrafficLayer } from "react-google-maps"

const BusStopMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDlqp_xDwz-gGxa4BfprQ_cyl98Obgdc6w&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: parseFloat(props.lat), lng: parseFloat(props.long) }}>
    <Marker position={{ lat: parseFloat(props.lat), lng: parseFloat(props.long) }} />
    <TrafficLayer autoUpdate />
  </GoogleMap>
)

export default BusStopMap;
