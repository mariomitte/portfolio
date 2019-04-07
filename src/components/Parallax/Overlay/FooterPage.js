import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Keyframes, animated, config } from "react-spring/renderprops";
import delay from "delay";

const Sidebar = Keyframes.Spring({
  // single items,
  open: { to: { x: 0, opacity: 1 }, config: config.default },
  // or async functions with side-effects
  close: async call => {
    await delay(100);
    await call({ to: { x: -100, opacity: 0 }, config: config.gentle });
  }
});

const FooterPage = ({ children, menu }) => (
  <Wrapper>
    <Sidebar native state={menu ? "close" : "open"}>{
      ({ x, opacity }) => (
        <animated.div
          style={{
            opacity: opacity,
            transform: x.interpolate(x => `translate3d(${x}%,0,0)`)
          }}
        >
          {children}
        </animated.div>
      )
    }</Sidebar>
  </Wrapper>
)

const Wrapper = styled.div`
  position: absolute;
  right: 20px;
  width: 90%;
`

FooterPage.propTypes = {
  menu: PropTypes.bool.isRequired,
}

export default FooterPage;
