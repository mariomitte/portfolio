import React from 'react'
import { Link } from 'gatsby'
import { Spring, Keyframes, animated, config } from "react-spring/renderprops";
import delay from "delay";
import styled from 'styled-components'

import 'typeface-raleway'

const fast = {
  ...config.stiff,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 0.01
};

// sidebar navigation
// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
  // Slots can take arrays/chains,
  peek: [
    { delay: 500, from: { x: -100 }, to: { x: 0 }, config: fast },
    { delay: 800, to: { x: -100 }, config: config.default }
  ],
  // single items,
  open: { to: { x: 0 }, config: config.default },
  // or async functions with side-effects
  close: async call => {
    await delay(400);
    await call({ to: { x: -200 }, config: config.gentle });
  }
});

// Creates a keyframed trail
const KeyFramed = Keyframes.Trail({
  open: { delay: 100, to: { x: 0, opacity: 1 } },
  close: { to: { x: -100, opacity: 0 } }
});

const items = ["home page", "blog", "about me", "contact"];
const link = ["/", "/blog", "/about-me", "/contact"]

const Navigation = ({ toggle }) => {
  const state = toggle ? "open" : "close";

  return (
    <Sidebar native state={state}>{
      ({ x }) => (
        <SidebarAnimated
          style={{
            opacity: 0.94,
            transform: x.interpolate(x => `translate3d(${x}%,0,0)`)
          }}
        >
          <KeyFramed
            native
            items={items}
            keys={items.map((_, i) => i)}
            config={{ tension: 200, friction: 20 }}
            state={state}
          >
            {(item, i) => ({ x, ...props }) => (
              <KeyframedAnimated
                style={{
                  transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                  ...props
                }}
              >
                <StyledLink to={link[i]}>{item}</StyledLink>
              </KeyframedAnimated>
            )}
          </KeyFramed>
        </SidebarAnimated>
      )
    }</Sidebar>
  );
}

const BarsContainer = ({ opacity, rotation, margin, padding, loaded }) => (
  <React.Fragment>
    <Bar style={{ transform: `translateY(${padding}) rotate(${rotation})` }} />
    {loaded
      ? <Bar style={{ marginTop: margin, marginBottom: margin }} />
      : <Bar style={{ marginTop: margin, marginBottom: margin, opacity: opacity }} />
    }
    <Bar
      style={{ transform: `translateY(-${padding}) rotate(-${rotation})` }}
    />
  </React.Fragment>
);

class SpringMenu extends React.Component {
  state = {
    loaded: false,
  }

  componentDidMount() {
    this.loaded();
  }

  loaded = () => this.setState(state => ({ loaded: true }));

  render() {
    const toggle = this.props.menu;
    const { loaded } = this.state;

    return (
      <Wrapper>
        <Box>
          <Spring
            from={{ opacity: 0 }}
            to={{
              rotation: toggle ? "135deg" : "0deg",
              opacity: toggle ? 0 : 1,
              margin: toggle ? "0px" : "4px",
              padding: toggle ? "4px" : "0px",
              loaded: loaded ? 0 : 1,
            }}
            config={config.default}
            children={BarsContainer}
          />
        </Box>
        <Navigation toggle={toggle} />
      </Wrapper>
    );
  }
}

const StyledLink = styled(Link)`
  font-family: 'Kanit', sans-serif;
  color: black;
  font-weight: bold;
  position: relative;
  text-decoration: none;
`

const KeyframedAnimated = styled(animated.div)`
  cursor: pointer;
  position: relative;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  font-size: 60px;
  margin: 1rem;

  @media (max-width: 700px) {
    font-size: 40px;
  }
`

const SidebarAnimated = styled(animated.div)`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  flex: wrap;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: 0;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const Bar = styled.div`
  border-width: 4px;
  border-bottom-style: solid;
  border-bottom-color: rgb(221, 71, 71);
`;

export default SpringMenu;
