import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

class Location extends React.Component {
  state = {
    latitude: "",
    longitude: "",
    loaded: false,
  }

  componentDidMount() {
    if(this.props.geolocation) {
      let { latitude, longitude } = this.props.geolocation
      this.setState({ latitude, longitude, loaded: true })
    } else {
      this.setState({ loaded: false })
    }
  }

  componentWillUnmount() {
    this.setState({
      latitude: "",
      longitude: "",
      loaded: false,
    })
  }

  render() {
    const { latitude, longitude, loaded } = this.state

    return (
      <React.Fragment>
        {loaded && <LoadScript
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
          </LoadScript>}
      </React.Fragment>
    )
  }
}

export default Location
