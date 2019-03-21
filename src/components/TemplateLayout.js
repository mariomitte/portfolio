import React from 'react'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import 'typeface-raleway'
import theme from '../../config/theme'
import { Reset } from '../styles/reset'
import Navbar from './Navbar'

class TemplateLayout extends React.Component {
  state = {
    menu: false,
  }

  menu = () => this.setState(prevState => ({ menu: !prevState.menu }))

  render() {
    const { menu } = this.state
    const { children, type } = this.props

    return (
      <Page>
        <GlobalStyles />
        <Navbar menu={menu} onMenu={this.menu} type={type} />
        <Main>
          <Limits>
            {children}
          </Limits>
        </Main>
      </Page>
    );
  }
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Limits = styled.div`
  max-width: 970px;
  width: 100%;
  position: absolute;
  top: 300px;
  background-color: white;
  border: 1px solid  gainsboro;
  border-radius: 1em;
`;

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

export default TemplateLayout;
