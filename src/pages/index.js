import React from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

import Page from '../components/Page'
import Overlay from '../components/Parallax/Overlay'

import theme from '../../config/theme'
import '../components/Parallax/style.css'

const gradients = [ "pink", "teal", "blue", "orange" ]

class Index extends React.Component {
  state = {
    items: 4,       // size of parallax container
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
    const {
      data: { homepage, social, posts, projects },
    } = this.props

    let pageItem = homepage.data.page.map((page, i) => {
      return (
        <Page
          key={i}
          offset={i}
          gradient={gradients[i]}
          repeatColor={theme.colors.background}
          caption={page.caption}
          first={page.first.text}
          second={page.second.text}
          image={page.image.url}
        />
      )
    })

    return (
      <Wrapper>
        <Parallax className="container" ref="parallax" pages={items} horizontal scrolling={false}>
          {pageItem}
        </Parallax>
        <Overlay menu={menu} onMenu={this.menu} prevIndex={this.prevIndex} nextIndex={this.nextIndex} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right:0;
  background-color: ${theme.colors.background};
`

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.object.isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query IndexQuery {
    homepage: prismicHomepage {
      data {
        title {
          text
        }
        page {
          caption
          first {
            text
          }
          second {
            text
          }
          image {
            url
          }
        }
      }
    }
  }
`
