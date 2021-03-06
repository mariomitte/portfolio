// Inspired by Corey Haggards "Screeners"
// https://dribbble.com/shots/4138489-Screeners

import React from 'react'
import PropTypes from 'prop-types'
import { ParallaxLayer } from 'react-spring/renderprops-addons'
import styled from 'styled-components'
// import Overlay from './Parallax/Overlay'

import FooterMenu from './Parallax/Overlay/FooterMenu'
import Star from './Parallax/Overlay/Star'

import 'typeface-raleway'

const ImageItem = ({ url }) => {
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    opacity: 0.5,
  };

  return <ImageContainer style={styles} />;
};

class Page extends React.Component {
  render() {
    const { index, offset, gradient, caption, first, second, image, color, modal, onModal } = this.props

    return (
      <React.Fragment>
        <ParallaxLayer offset={offset} speed={-0.2}>
          <React.Fragment>
            <SlopeEndGradient gradient={gradient}>
              <div style={{ position: 'relative', width: '100%', height: '100%'}}>
                <ImageItem url={image} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: 'white', height: '50px'}}>
                  <BottomRightText>{first}</BottomRightText>
                </div>
              </div>
            </SlopeEndGradient>
          </React.Fragment>
        </ParallaxLayer>

        <ParallaxLayer offset={offset} speed={0.2}>
          <SlopeBegin>
            <Stats>
              <Star modal={modal} onModal={onModal} />
            </Stats>
          </SlopeBegin>
          <Line />
        </ParallaxLayer>

        {!modal && <React.Fragment>
          <NumberText offset={offset} speed={0.3}>
            <SpanNumber>0{offset + 1}</SpanNumber>
          </NumberText>

          <ParallaxLayer offset={offset} speed={0.4}>
            <Text>
              <Caption>
                <Paragraph>
                  {caption}
                </Paragraph>
                <StripeGradient gradient={gradient} />
              </Caption>
              <Description>{first}</Description>
              <Second color={gradient}>{second}</Second>
            </Text>
          </ParallaxLayer>

          <ParallaxLayer offset={offset} speed={0.4}>
            <React.Fragment>
              <Line />
              <FooterMenu index={index} color={color} data="" onModal={onModal} />
            </React.Fragment>
          </ParallaxLayer>
        </React.Fragment>}
      </React.Fragment>
    );
  }
}

const Stats = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Line = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  opacity: 0.3;
  border-top: 1px solid whitesmoke;
  display: flex;
`

const Stripe = styled.div`
  height: 4px;
  width: 100%;
  margin-bottom: 2em;
`

const StripeGradient = styled(Stripe)`
  background: ${props => props.gradient}
`

const NumberText = styled(ParallaxLayer)`
  justify-content: start !important;
  font-family: 'Kanit', sans-serif;
  line-height: 0px;
  text-transform: uppercase;
  font-size: 250px;
  color: #373c4c;
  font-weight: bold;
`

const BottomRightText = styled.span`
  font-family: 'Kanit', sans-serif;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 45%;
  color: black;

  @media (max-width: 700px) {
    display: none;
  }
`

const SpanNumber = styled.span`
  font-family: 'Kanit', sans-serif;
  display: inline-block;
  position: relative;
  transform: translate3d(-35%, 0, 0);

  @media (max-width: 700px) {
    display: none;
  }
`

const SlopeContainer = styled.div`
  position: absolute;
  width: 140%;
  height: 100%;
`

const SlopeBegin = styled(SlopeContainer)`
  background-color: #20232f;
  clip-path: polygon(20vw 0, 60% 0, calc(60% - 20vw) 100%, 0 100%);
`

const SlopeEnd = styled(SlopeContainer)`
  clip-path: polygon(60% 0, 100% 0, calc(100% - 20vw) 100%, calc(60% - 20vw) 100%);
`

const SlopeEndGradient = styled(SlopeEnd)`
  background: ${props => props.gradient}
`

const ImageContainer = styled.div`
  height: 100%;
  width: 60%;
  position: fixed;
  right: 0;
  top: 0;
`

const Text = styled.div`
  position: absolute;
  left: 230px;
  display: flex;
  flex-direction: column;
  font-family: 'Kanit', sans-serif;
  text-transform: uppercase;
  font-size: 1rem;
  color: white;
  width: 100%;
  right: 0;

  @media (max-width: 700px) {
    left: 10px;
    right: 10px;
  }
`

const Paragraph = styled.p`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-flow: row wrap;
  margin: 0;

`

const Caption = styled.div`
  font-size: 1rem;
  margin: 0.7em 0;
  color: whitesmoke;
  width: 45%;

`

const Description = styled(Paragraph)`
  font-size: 1.9rem;
  margin: 0;
  font-weight: bold;
`

const Second = styled(Description)`
  font-size: 1rem;
  color: ${props => props.color};
  text-transform: none;
  margin-top: 1rem;
`

export default Page

Page.propTypes = {
  index: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  gradient: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onModal: PropTypes.func.isRequired,
}
