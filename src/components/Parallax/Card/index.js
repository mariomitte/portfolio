import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Spring, Keyframes, animated, config } from "react-spring/renderprops";
import delay from "delay";
import styled from 'styled-components'
import theme from '../../../../config/theme'

const fast = {
  ...config.stiff,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 0.01
};

const Pop = Keyframes.Spring({
  // single items,
  open: { to: { height: 400 }, config: config.default },
  // or async functions with side-effects
  close: async call => {
    await delay(500);
    await call({ to: { height: 0 } });
  }
});

// sidebar navigation
// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
  // single items,
  open: { to: { x: 0 }, config: config.default },
  // or async functions with side-effects
  close: async call => {
    await delay(400);
    await call({ to: { x: 0 }, config: config.gentle });
  }
});

// Creates a keyframed trail
const KeyFramed = Keyframes.Trail({
  open: { delay: 100, to: { x: 0, opacity: 1 } },
  close: { to: { x: 20, opacity: 0 } }
});

const link = ["/", "/blog", "/about-me", "/contact"]

const Items = ({ toggle, onClick, uid, title, date, at }) => {
  const state = toggle ? "open" : "close";
  const items = title

  return (
    <Sidebar native state={state}>{
      ({ x }) => (
        <SidebarAnimated
          style={{
            transform: x.interpolate(x => `translate3d(${x}%,0,0)`)
          }}
        >
          <KeyframedAnimated>
            <KeyFramed
              native
              items={items}
              keys={items.map((_, i) => i)}
              config={{ tension: 200, friction: 20 }}
              state={state}
            >
              {(item, i) => ({ x, ...props }) => (
                <animated.div
                  onClick={onClick}
                  style={{
                    paddingLeft: '1em',
                    transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                    ...props
                  }}
                >
                  <StyledLink to={`${at}${uid[i]}`}>{title[i]} <span>{date[i]}</span><Line /></StyledLink>
                  <Line />
                </animated.div>
              )}
            </KeyFramed>
          </KeyframedAnimated>
        </SidebarAnimated>
      )
    }</Sidebar>
  );
}

const Card = ({ pop, toggle, onPop, onToggle, data, at }) => {
  const title = data.map(item => item.node.data.title.text)
  const date = data.map(item => item.node.data.date)
  const uid = data.map(item => item.node.uid)
  // console.log("Card UID", data.map(item => item.node.uid))

  return (
    <Pop native state={pop ? "open" : "close"}>{
      ({ height }) => (
        <Wrapper style={{
            height: height,
          }}
        >
          <Items toggle={pop} onClick={onPop} uid={uid} title={title} date={date} at={at} />
        </Wrapper>
      )
    }</Pop>
  );
}

const Line = styled.div`
  width: 100%;
  opacity: 0.3;
  border-bottom: 1px solid whitesmoke;
`

const StyledLink = styled(Link)`
  color: white;
  font-weight: bold;
  position: relative;
  text-decoration: none;
  width: 100%;
  height: 100%;
  font-size: 0.8em;
`

const KeyframedAnimated = styled(animated.div)`
  position: relative;
  text-align: start;
  width: 80%;
  height: 50px;
  text-transform: uppercase;
  font-size: 30px;

  @media (max-width: 700px) {
    font-size: 20px;
  }
`

const SidebarAnimated = styled(animated.div)`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  background-color: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  flex: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  border-top: 1px solid white;
`

const Wrapper = styled(animated.div)`
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 52px;
  width: 100%;
  height: 400px;
  border: 0;
`;


Card.propTypes = {
  pop: PropTypes.bool,
  toggle: PropTypes.bool,
  onPop: PropTypes.func,
  onToggle: PropTypes.func,
  data: PropTypes.array,
  at: PropTypes.string.isRequired,
}

export default Card;
