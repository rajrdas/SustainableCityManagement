import React from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, TrafficLayer } from "react-google-maps"

const DublinBikeClusters = compose(
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
    defaultZoom={13}
    defaultCenter={{ lat: 53.343792, lng: -6.254572 }}
    >
   {
   props.clusterDict[0].map((cluster,index) => (
    <Marker
      position={{ lat: parseFloat(cluster.Latitude), lng: parseFloat(cluster.Longitude) }}
      key={index} icon= {{
        url: cluster.Color
    }}
    />
   ))}
    <TrafficLayer autoUpdate />
  </GoogleMap>
)

export default DublinBikeClusters;
