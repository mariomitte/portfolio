import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import Overlay from '../Overlay'
import styled from 'styled-components'
import theme from '../../../../config/theme'

import Button from '../ButtonAction'
import FooterMenu from '../Overlay/FooterMenu'
import ArrowItem from '../ArrowItem'
import Modal from '../Modal'

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

const Blog = ({ gradient, offset, caption, first, second, repeatColor, url, onModal, modal }) => (
  <React.Fragment>
    <ParallaxLayer offset={offset} speed={0.2}>
      <SlopeBegin />
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={-0.2}>
      <React.Fragment>
        <SlopeEndGradient gradient={gradient}>
          <div style={{ position: 'relative', width: '100%', height: '100%'}}>
            <ImageItem url={url} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: 'white', height: '50px'}} />
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
        <div className={`stripe ${gradient}`} />
        <Paragraph>{first}</Paragraph>
        <Paragraph>{second}</Paragraph>
      </Text>
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={0.4}>
      <React.Fragment>
        <Line />
        <FooterMenu>
          <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ padding: 0, margin: 0 }}>Online space @Mario</p>
            <Button
              children={<span>Blog Posts</span>}
              arrow={<ArrowItem color="true" direction="up" />}
              onClick={onModal}
            />
          </div>
        </FooterMenu>
        <Modal modal={modal} onClick={onModal} children={<span>Items</span>} />
      </React.Fragment>
    </ParallaxLayer>
  </React.Fragment>
)

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
  clip-path: polygon(20vw 0, 70% 0, calc(70% - 20vw) 100%, 0 100%);
`

const SlopeEnd = styled(SlopeContainer)`
  clip-path: polygon(70% 0, 100% 0, calc(100% - 20vw) 100%, calc(70% - 20vw) 100%);
`

const SlopeEndGradient = styled(SlopeEnd)`
  background: ${props => props.gradient}
`

const ImageContainer = styled.div`
  height: 50%;
  width: 40%;
  position: fixed;
  right: 0;
  top: 0;
`

const Line = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  opacity: 0.3;
  border-top: 1px solid whitesmoke
  display: flex;
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

// action, gradient, offset, caption, first, second, repeatColor, url, onModal, modal
//
// Page.propTypes = {
//
// }

export default Blog;
