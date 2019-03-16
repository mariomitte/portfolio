import React, { Component } from 'react'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import Overlay from './Overlay'
import styled from 'styled-components'
import theme from '../../../config/theme'
import './style.css'

import Page from './Page'
import Blog from './Page/Blog'
import Projects from './Page/Projects'

//<div style={{ position: 'absolute', right: 0, bottom: 0, width: '100%', height: '50px;', backgroundColor: 'white' }} />

class Layout extends Component {
  state = {
    items: 3,       // size of parallax container
    index: 0,       // keep track of scroll index in parallax page
    menu: false,    // flag for open and close menu
    modal: false,   // flag for poping a modal dynamic with content
  }

  // parallax method to access new page
  scroll = to => this.refs.parallax.scrollTo(to)

  // clicks on menu
  menu = () => this.setState(prevState => ({ menu: !prevState.menu }))

  // clicks on modal button
  modal = () => this.setState(prevState => ({ modal: !prevState.modal }))

  // jump into new or previous page
  nextIndex = () => {
    const { items, index } = this.state
    const lastIndex = items - 1
    const shouldResetIndex = index === lastIndex
    const newIndex = shouldResetIndex ? 0 : index + 1
    this.setState(prevState => ({ index: newIndex }))
    this.scroll(newIndex)
  }
  prevIndex = () => {
    const { items, index } = this.state
    const lastIndex = items - 1
    const shouldResetIndex = index === 0
    const newIndex = shouldResetIndex ? lastIndex : index - 1
    this.setState(prevState => ({ index: newIndex }))
    this.scroll(newIndex)
  }

  render() {
    const { items, index, menu, modal } = this.state

    return (
      <Wrapper>
        <Parallax className="container" ref="parallax" pages={items} horizontal scrolling={false}>
          <Page
            offset={0}
            gradient="pink"
            repeatColor={theme.colors.background}
            caption="who we are"
            first="Lorem ipsum"
            second="dolor sit"
            url="https://cmeimg-a.akamaihd.net/640/clsd/getty/c64f76dc20c246ca88ee180fe4b4b781"
            onModal={this.modal}
            modal={modal}
          />
          <Page
            offset={1}
            gradient="pink"
            gradient="teal"
            repeatColor={theme.colors.background}
            caption="what we do"
            first="consectetur"
            second="adipiscing elit"
            url="https://lh3.googleusercontent.com/oxPeODS2m6rYIVbhcQChRtOWEYeGDwbeeeB1cDU2o_WYAVPU61VIgx-_6BAh5gSL8Sw=h900"
            onModal={this.modal}
            modal={modal}
          />
          <Page
            offset={2}
            gradient="pink"
            color="tomato"
            repeatColor={theme.colors.background}
            caption="what we want"
            first="Morbi quis"
            second="est dignissim"
            url="https://i0.wp.com/www.universodegatos.com/wp-content/uploads/2017/04/fivfelv7.jpg?resize=582%2C328"
            onModal={this.modal}
            modal={modal}
          />
        </Parallax>
        <Overlay menu={menu} onMenu={this.menu} prevIndex={this.prevIndex} nextIndex={this.nextIndex} />
      </Wrapper>
    );
  }
}

// const FooterButton = styled.button`
//   width: 140px;
//   height: 45px;
//   font-family: 'Roboto', sans-serif;
//   font-size: 11px;
//   text-transform: uppercase;
//   letter-spacing: 2.5px;
//   font-weight: 500;
//   color: #000;
//   background-color: #fff;
//   border: none;
//   border-radius: 45px;
//   box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease 0s;
//   cursor: pointer;
//   outline: none;
//
//   &:hover {
//     background-color: #2ee59d;
//     box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
//     color: #fff;
//     transform: translateY(-7px);
//   }
// `

const Wrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right:0;
  background-color: ${theme.colors.background};
`

export default Layout;
