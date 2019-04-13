import React from 'react'
import { Link } from 'gatsby'
import { Spring, Keyframes, animated, config } from "react-spring/renderprops";
import delay from "delay";
import styled from 'styled-components'

import social from '../../../../config'

import 'typeface-raleway'
import { FaHeart } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'

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

const Social = () => (
  <SocialWrapper>
    <SocialItem href={"https://www.facebook.com/"+social.facebook} target="_blank" rel="noopener noreferrer">
      <FaFacebookF style={{ width: "50%", height: "50%" }}/>
    </SocialItem>
    <SocialItem href={"https://www.instagram.com/"+social.instagram} target="_blank" rel="noopener noreferrer">
      <FaInstagram style={{ width: "50%", height: "50%" }} />
    </SocialItem>
    <SocialItem href={"https://twitter.com/"+social.twitter} target="_blank" rel="noopener noreferrer">
      <FaTwitter style={{ width: "50%", height: "50%" }} />
    </SocialItem>
  </SocialWrapper>
)

const items = ["home", "blog", "projects", "places", "about me"];
const link = ["/", "/blog", "/projects", "/places", "/about-me"]

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
          <About>
            build with <span style={{ margin: "0 0.5rem", color: "#e53935" }}><FaHeart /></span> by Mario
          </About>
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
          <Social />
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

const About = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  width: 50%;
  height: 40px;
  display: flex;
  align-ittems: center;
  justify-content: flex-end;
  font-size: 16px;

  @media (max-width: 700px) {
    font-size: 12px;
  }
`

const SocialItem = styled.a`
  width: 3em;
  height: 3em;
  border-radius: 50%;
  margin: 0 1rem;
  background: linear-gradient(to right, deeppink 0%, red 100%);
  opacity: 0.92;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  @media (max-width: 700px) {
    width: 2em;
    height: 2em;
  }
`

const SocialWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  align-ittems: center;
  justify-content: center;
`

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
