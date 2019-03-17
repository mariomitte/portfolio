import React from 'react'
import PropTypes from 'prop-types'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import styled from 'styled-components'
// import Overlay from './Parallax/Overlay'

import FooterMenu from './Parallax/Overlay/FooterMenu'

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
    const { gradient, offset, caption, first, second, repeatColor, image } = this.props

    return (
      <React.Fragment>
        <ParallaxLayer offset={offset} speed={0.2}>
          <SlopeBegin />
          <Line />
        </ParallaxLayer>

        <ParallaxLayer offset={offset} speed={-0.2}>
          <React.Fragment>
            <SlopeEndGradient gradient={gradient}>
              <div style={{ position: 'relative', width: '100%', height: '100%'}}>
                <ImageItem url={image} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: 'white', height: '50px'}}>
                  <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: 0, bottom: 0, height: '100%', width: '45%' }}><Paragraph>{caption}</Paragraph></div>
                </div>
              </div>
            </SlopeEndGradient>
          </React.Fragment>
        </ParallaxLayer>

        <NumberText offset={offset} speed={0.3}>
          <SpanNumber>0{offset + 1}</SpanNumber>
        </NumberText>

        <ParallaxLayer offset={offset} speed={0.4}>
          <Text>
            <Paragraph style={{ fontSize: 20 }}>{caption}</Paragraph>
            <StripeGradient gradient={gradient} />
            <Paragraph>{first}</Paragraph>
            <Paragraph>{second}</Paragraph>
          </Text>
        </ParallaxLayer>

        <ParallaxLayer offset={offset} speed={0.4}>
          <React.Fragment>
            <Line />
            <FooterMenu />
          </React.Fragment>
        </ParallaxLayer>
      </React.Fragment>
    );
  }
}

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
  height: 2px;
  width: auto;
`

const StripeGradient = styled(Stripe)`
  background: ${props => props.gradient}
`

const NumberText = styled(ParallaxLayer)`
  justify-content: start !important;
  font-family: 'Kanit', sans-serif;
  line-height: 0px;
  text-transform: uppercase;
  font-size: 450px;
  color: #373c4c;
`

const SpanNumber = styled.span`
  display: inline-block;
  position: relative;
  transform: translate3d(-35%, 0, 0);
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
  left: 0;
  margin-left: 350px;
  display: flex;
  flex-direction: column;
  font-family: 'Kanit', sans-serif;
  text-transform: uppercase;
  font-size: 3rem;
  color: black;
`

const Paragraph = styled.p`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-flow: row wrap;
  margin: 0;
`

export default Page

Page.propTypes = {
  offset: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  gradient: PropTypes.string.isRequired,
  repeatColor: PropTypes.string.isRequired,
}
