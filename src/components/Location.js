import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

class MyComponents extends Component {
  render() {
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey="YOUR_API_KEY"
        {...other props}
      >
        <GoogleMap
          id='example-map'
          {...other props }
        >
          ...Your map components
        </GoogleMap>
      </LoadScript>
     )
  }
}
