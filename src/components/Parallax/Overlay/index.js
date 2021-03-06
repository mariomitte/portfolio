import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import SpringMenu from '../Menu'
import FooterPage from './FooterPage'
import ArrowItem from '../ArrowItem'

const Overlay = ({ color, menu, onMenu, prevIndex, nextIndex, modal, onModal }) => {
  return (
    <React.Fragment>
      <Vertical>
        <ColumnBorder>
            <div style={{ marginTop: '10px', alignItems: 'center'}}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img style={{ width: '40px', height: '40px' }} src="favicons/android-chrome-192x192.png" alt="favicons" />
              </div>
            </div>
          </ColumnBorder>
          <Column style={{ marginTop: '10px', alignItems: 'center' }}>
            <Menu onClick={onMenu}>
              <SpringMenu menu={menu} />
            </Menu>
          </Column>
        </Vertical>
        <Footer>
          <FooterPage menu={menu}>
            <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <div>
                <Button color={color} onClick={prevIndex}>
                  <ArrowItem direction="left" />
                </Button>
                <Button color={color} onClick={nextIndex}>
                  <ArrowItem direction="right" />
                </Button>
              </div>
            </div>
          </FooterPage>
        </Footer>
    </React.Fragment>
  );
}

const Button = styled.button`
  width: 60px;
  height: 40px;
  margin-left: -10px;
  clip-path: polygon(30% 0%, 100% 0, 70% 100%, 0% 100%);
  background-color: ${props => props.color};
  border: 0;
  cursor: pointer;
`

const Vertical = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  width: 200px;
  z-index: 20;
  display: flex;
  flex-direction: row;

  @media (max-width: 700px) {
    height: 50px;
    width: 150px;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`

const ColumnBorder = styled(Column)`
  opacity: 0.3;
  border-right: 1px solid whitesmoke;

  @media (max-width: 700px) {
    border-right: 0;
  }
`

const Menu = styled.div`
  position: absolute;
  right: 50;
  width: 40px;
  height: 40px;
`

const Footer = styled.div`
  position: absolute;
  z-index: 5;
  bottom: 0;
  right: 0;
  width: 40%;
  height: 50px;
  z-index: 20;
  display: flex;
`

Overlay.propTypes = {
  color: PropTypes.string.isRequired,
  menu: PropTypes.bool.isRequired,
  onMenu: PropTypes.func.isRequired,
  prevIndex: PropTypes.func.isRequired,
  nextIndex: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  onModal: PropTypes.func.isRequired,
}

export default Overlay;
