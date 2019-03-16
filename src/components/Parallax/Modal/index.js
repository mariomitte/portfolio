import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Modal = ({ modal, onClick, children }) => (
  <Wrapper open={modal} onClick={onClick}>
    <ModalContent>
      {children}
    </ModalContent>
  </Wrapper>
)

const ModalContent = styled.div`
  margin-left: 120px;
  max-width: 700px;
  width: 500px;
  max-height: 80%;
  border: 2px solid black;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    margin-left: 0;
    width: 100%;
  }
`

const Wrapper = styled.div`
  display: ${props => props.open ? 'flex' : 'none'};
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  align-items: center;
  justify-content: flex-start;
`

Modal.propTypes = {
  modal: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
}

export default Modal;
