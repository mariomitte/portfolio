import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from '../../../../config/theme'

import SpringMenu from '../Menu'
import FooterMenu from './FooterMenu'
import FooterPage from './FooterPage'
import ArrowItem from '../ArrowItem'

const Overlay = ({ menu, onMenu, prevIndex, nextIndex }) => {
  return (
    <React.Fragment>
      <Vertical>
          <Column style={{ opacity: 0.3, borderRight: '1px solid whitesmoke' }}>
            <div style={{ marginTop: '10px', alignItems: 'center'}}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img style={{ width: '40px', height: '40px' }} src="favicons/android-chrome-192x192.png" />
              </div>
            </div>
          </Column>
          <Column style={{ marginTop: '10px', alignItems: 'center' }}>
            <Menu onClick={onMenu}>
              <SpringMenu menu={menu} />
            </Menu>
          </Column>
        </Vertical>
        <Footer>
          <Line />
          <FooterPage menu={menu}>
            <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ padding: 0, margin: 0 }}>Some Text</p>
              <div>
                <Button onClick={prevIndex}>
                  <ArrowItem direction="left" />
                </Button>
                <Button onClick={nextIndex}>
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
  background-color: ${theme.colors.navigation};
  border: 0;
  cursor: pointer;
`

const Vertical = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 200px;
  z-index: 20;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
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

const Line = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  border-top: 1px solid whitesmoke
  display: flex;
`

Overlay.propTypes = {
  menu: PropTypes.bool.isRequired,
  prevIndex: PropTypes.func.isRequired,
  nextIndex: PropTypes.func.isRequired,
}

export default Overlay;