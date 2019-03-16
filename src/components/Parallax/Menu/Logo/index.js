import React from "react";
import { Link } from 'gatsby'
import { Keyframes, animated, config } from "react-spring/renderprops";

const Counter = Keyframes.Spring({
  original: { to: { transform: "scale(1)" }, config: config.default },
  expand: { from: { transform: "scale(1)" }, to: { transform: "scale(1.2)" }, config: config.default },
});

class Logo extends React.Component {
  state = {
    hover: false,
  }

  hover = () => this.setState(state => ({ hover: !state.hover }));
  hoverEnter = () => this.setState(state => ({ hover: true }));
  hoverLeave = () => this.setState(state => ({ hover: false }));

  render() {
    const state = this.state.hover ? "expand" : "original"

    return (
      <Counter
        native
        state={state}
      >
        {(styles) => (
          <animated.div
            style={styles}
            onMouseEnter={this.hoverEnter}
            onMouseLeave={this.hoverLeave}
          >
            <Link className="no-underline text-blue hover:text-blue-darker display: flex" to="/">Logo</Link>
          </animated.div>
        )}
      </Counter>
    );
  }
}

export default Logo;
