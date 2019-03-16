import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from '../../../config/theme'

import Card from './Card'

const ButtonAction = ({ children, arrow, onClick }) => {
  if (arrow !== null) {
    return (
      <Wrapper onClick={onClick}>
        <Arrow>
          {arrow}
        </Arrow>
        {children}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper onClick={onClick}>
        {children}
      </Wrapper>
    );
  }
}

const Arrow = styled.div`
  margin-right: 1rem;
`

const Wrapper = styled.div`
  opacity: ${props => props.opacity};
  height: 40px;
  border-width: 0;
  background: ${theme.colors.pageButton};
  color: white;
  border-radius: 5px;
  white-space: nowrap;
  box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
  transition-property: background-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  padding: 0 1rem;
  max-width: 140px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
  }

  &:focus{
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: #orange;
    box-shadow: none;
    transition-duration: 10ms;
  }
`

ButtonAction.propTypes = {
  children: PropTypes.object.isRequired,
  arrow: PropTypes.object,
  onClick: PropTypes.func,
}

export default ButtonAction;
