import React from 'react'
import PropTypes from 'prop-types'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import styled from 'styled-components'
// import Overlay from './Parallax/Overlay'

class Page extends React.Component {
  render() {
    const { caption, first, second, image } = this.props
    
    return (
      <React.Fragment>
        <h1>{caption}</h1>
        <span>{first}</span>
        <span>{second}</span>
        <p>{image}</p>
      </React.Fragment>
    );
  }
}

export default Page

Page.propTypes = {
  caption: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}
