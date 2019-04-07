import React from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Parallax } from 'react-spring/renderprops-addons'

import Page from '../components/Page'
import Overlay from '../components/Parallax/Overlay'

import theme from '../../config/theme'
import '../components/Parallax/style.css'
import { Reset } from '../styles/reset'

const gradientsOffline = [ "pink", "teal", "blue", "orange" ]

class Index extends React.Component {
  state = {
    items: 4,       // size of parallax container
    index: 0,       // keep track of scroll index in parallax page
    menu: false,    // flag for open and close menu
    modal: false,   // flag for poping a modal dynamic with content
    gradients: [],
  }

  componentDidMount() {
    let color = this.props.data.homepage.data.page.map((item, i) => item.color)
    // console.log("-- Index --", color.page.map((item, i) => item.color))
    this.setState({ gradients: color })
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
    this.setState(prevState => ({ index: newIndex, modal: false }))
    this.scroll(newIndex)
  }
  prevIndex = () => {
    const { items, index } = this.state
    const lastIndex = items - 1
    const shouldResetIndex = index === 0
    const newIndex = shouldResetIndex ? lastIndex : index - 1
    this.setState(prevState => ({ index: newIndex, modal: false }))
    this.scroll(newIndex)
  }

  render() {
    const { items, index, menu, modal, gradients } = this.state
    const {
      data: { homepage },
    } = this.props

    let pageItem = homepage.data.page.map((page, i) => {
      return (
        <Page
          key={i}
          offset={i}
          gradient={page.color}
          caption={page.caption}
          first={page.first.text}
          second={page.second.text}
          image={page.image.url}
          color={page.color}
          index={index}
          modal={modal}
          onModal={this.modal}
        />
      )
    })

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <GlobalStyles />
          <Parallax className="container" ref="parallax" pages={items} horizontal scrolling={false}>
            {pageItem}
          </Parallax>
          <Overlay menu={menu} onMenu={this.menu} prevIndex={this.prevIndex} nextIndex={this.nextIndex} color={gradients.length === 0 ? gradientsOffline[index] : gradients[index]} modal={modal} onModal={this.modal} />
        </Wrapper>
      </ThemeProvider>
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

const GlobalStyles = createGlobalStyle`
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ::selection {
    color: white;
    background-color: #f6993f;
  }
  html {
    box-sizing: border-box;
    border: 0;
    margin: 0;

    h1, h2, h3, h4, h5, h6 {
      font-weight: ${theme.fontWeights.bold};
    }

    h1 {
      font-size: ${theme.fontSizes[5]};
    }
    h2 {
      font-size: ${theme.fontSizes[4]};
    }
    h3 {
      font-size: ${theme.fontSizes[3]};
    }
    h4 {
      font-size: ${theme.fontSizes[2]};
    }
    h5 {
      font-size: ${theme.fontSizes[1]};
    }
    h6 {
      font-size: ${theme.fontSizes[0]};
    }

    @media (max-width: 600px) {
      font-size: 16px;

      h1 {
        font-size: ${theme.fontSizes[4]};
      }
      h2 {
        font-size: ${theme.fontSizes[3]};
      }
      h3 {
        font-size: ${theme.fontSizes[2]};
      }
      h4 {
        font-size: ${theme.fontSizes[1]};
      }
      h5 {
        font-size: ${theme.fontSizes[0]};
      }
      h6 {
        font-size: ${theme.fontSizes[0]};
      }
    }
  }
  body {
    border: 0;
    margin: 0;
    padding: 0;
    color: black;
    font-family: 'Work Sans', '-apple-system', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    background: white;
    font-size: 18px;
  }
  a {
    transition: all 0.3s ease-in-out;
    color: black;
    text-decoration: underline;
    &:hover,
    &:focus {
      color: ${theme.colors.primary};
    }
  }

  ${Reset}
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
          color
        }
      }
    }
  }
`
