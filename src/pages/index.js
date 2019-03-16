import React from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

import Page from '../components/Page'

import theme from '../../config/theme'

class Index extends React.Component {
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
    const {
      data: { homepage, social, posts, projects },
    } = this.props

    let pageItem = homepage.data.page.map((page, i) => {
      return (
        <Page
          key={i}
          caption={page.caption}
          first={page.first.text}
          second={page.second.text}
          image={page.image.url}
        />
      )
    })

    return (
      <Wrapper>
        {pageItem}
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
    posts: PropTypes.object.isRequired,
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
    social: allPrismicHeroLinks {
      edges {
        node {
          data {
            title {
              text
            }
            link {
              url
            }
          }
        }
      }
    }
    posts: allPrismicPost(sort: { fields: [data___date], order: DESC }) {
      edges {
        node {
          uid
          data {
            title {
              text
            }
            date(formatString: "DD.MM.YYYY")
            categories {
              category {
                document {
                  data {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
    projects: allPrismicProjects {
      edges {
        node {
          data {
            title {
              text
            }
            link {
              url
            }
          }
        }
      }
    }
  }
`
