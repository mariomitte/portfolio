import React from 'react'
import PropTypes from 'prop-types'

class Iframe extends React.Component {
  render () {
    const iframeStyle = {
      left: 0,
      right: 0,
      height: '100%',
      border: '0',
      position: 'absolute',
    }
    console.log(this.props.src)

    return (
      <iframe
        src={this.props.src}
        frameBorder={'0'}
        width={'100%'}
        height={'100%'}
        style={iframeStyle}
      />
    )
  }

}

export default Iframe

Iframe.propTypes = {
  src: PropTypes.string.isRequired,
}
