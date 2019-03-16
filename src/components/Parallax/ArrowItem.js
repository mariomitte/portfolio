import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ArrowItem = ({ direction, color }) => {
  if (direction === "right") {
    return (
      <Arrow color={color} style={{ transform: 'rotate(-45deg)' }} />
    );
  }
  if (direction === "left") {
    return (
      <Arrow color={color} style={{ transform: 'rotate(135deg)' }} />
    );
  }
  if (direction === "up") {
    return (
      <Arrow color={color} style={{ transform: 'rotate(-135deg)' }} />
    );
  }
  if (direction === "down") {
    return (
      <Arrow color={color} style={{ transform: 'rotate(45deg)' }} />
    );
  }
}

const Arrow = styled.div`
  border-style: solid;
  border-color: ${props => props.color ? "black" : "whitesmoke"};
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
`

ArrowItem.propTypes = {
  direction: PropTypes.string.isRequired,
}

export default ArrowItem;
