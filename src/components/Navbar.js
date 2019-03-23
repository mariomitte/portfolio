import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'

import SpringMenu from './Parallax/Menu'

//https://images.unsplash.com/${item.url}&auto=format&fit=crop

const offline = "https://images.unsplash.com/photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i&auto=format&fit=crop"

const ImageItem = ({ url, type, back, image }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
  };

  return <ImageContainer style={styles}>
    <SlopeEndGradient>
      <p style={{
          fontSize: '40px',
          color: 'white',
          flexWrap: 'wrap',
          width: '30%',
          margin: 0,
          padding: 0,
        }}
      >
        {type}
      </p>
      {back && <StyledLink to={back}>
          explore
        </StyledLink>
      }
    </SlopeEndGradient>
  </ImageContainer>;
};

const Navbar = ({ menu, onMenu, type, back, image }) => (
  <Wrapper>
    <ImageItem url={image} type={type} back={back} image={image ? image.fluid.src : offline} />
    <Header>
      <div style={{ width: '100px', display: 'flex', justifyContent: 'center' }}>
        <img style={{ width: '40px', height: '40px' }} src="../favicons/android-chrome-192x192.png" />
      </div>
      <div style={{ marginLeft: '50', width: '100px', height: '40px', display: 'flex', justifyContent: 'center' }}>
        <Menu onClick={onMenu}>
          <SpringMenu menu={menu} />
        </Menu>
      </div>
    </Header>
  </Wrapper>
)

const StyledLink = styled(Link)`
  color: white;
  width: 30%;
  fontSize: 40px;
  margin: 0;
  padding: 0;
`

const SlopeContainer = styled.div`
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 400px;
`

const SlopeEnd = styled(SlopeContainer)`
  clip-path: polygon(70% 0, 100% 0, 100% 100%, calc(70% - 20vw) 100%);
`

const SlopeEndGradient = styled(SlopeEnd)`
  background: linear-gradient(to right, deeppink 0%, red 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  opacity: 0.92;
`

const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  right: 0;
  top: 0;
  overflow: hidden;
`

const Wrapper = styled.div`
  height: 400px;
  overflow: hidden;
  background-repeat: no-repeat;
`

const Header = styled.div`
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  padding: 10px 0;
  margin-bottom: 1rem;
`
const Menu = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 99;
`

export default Navbar;

Navbar.propTypes = {
  menu: PropTypes.bool.isRequired,
  onMenu: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}
