import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

class Location extends React.Component {
  render() {
    const { latitude, longitude } = this.props.geolocation

     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyD6y8E0P_jSDLcZKCjfE8VxRgq5My0SXVI"
      >
        <GoogleMap
          id='map'
          mapContainerStyle={{
            height: "8rem",
            width: "8rem",
            borderRadius: "50%",
            border: "0.224em solid white",
            marginTop: "0.5rem",
            pointerEvents: "none",
          }}
          zoom={8}
          center={{
            lat: latitude,
            lng: longitude
          }}
          options={{
            disableDefaultUI: "true"
          }}
        >
        </GoogleMap>
      </LoadScript>
     )
  }
}

export default Location
