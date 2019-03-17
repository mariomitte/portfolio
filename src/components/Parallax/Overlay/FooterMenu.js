import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Card from '../Card'
import Button from '../ButtonAction'
import ArrowItem from '../ArrowItem'

import 'typeface-raleway'
const items = ["home page", "blog", "about me", "contact"];

// query={graphql`
//   query FooterMenuQuery {
//     allPrismicPost {
//       edges {
//         node {
//           uid
//           data {
//             title {
//               text
//             }
//             date(formatString: "DD.MM.YYYY")
//           }
//         }
//       }
//     }
//   }
// `}

class FooterMenu extends React.Component {
  state = {
    pop: false,
    toggle: false,
    items: null,
  }

  pop = () => this.setState(prevState => ({ pop: !prevState.pop }));
  toggle = () => this.setState(prevState => ({ toggle: !prevState.toggle }));

  render() {
    const { toggle, pop } = this.state
    const { index, color } = this.props

    return (
      <StaticQuery
        query={graphql`
          query FooterMenuQuery {
            allPrismicPost {
              edges {
                node {
                  uid
                  data {
                    title {
                      text
                    }
                    date(formatString: "DD.MM.YYYY")
                  }
                }
              }
            }
          }
        `}
        render={data => {
          if(index === 0) {
            return (
              <Wrapper />
            )
          }
          if(index === 1) {
            return (
              <Wrapper>
                <Card pop={pop} toggle={toggle} onPop={this.pop} onToggle={this.toggle} data={data.allPrismicPost.edges} />
                <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ padding: 0, margin: 0 }}>#mario</p>
                  <Button
                    color={color}
                    children={<span>Posts</span>}
                    arrow={<ArrowItem color="true" direction={pop ? "down" : "up"} />}
                    onClick={this.pop}
                  />
                </div>
              </Wrapper>
            )
          }
          if(index === 2 && index === 3) {
            return (
              <Wrapper />
            )
          }
        }}
      />
    );
  }
}

const Wrapper = styled.div`
  font-family: 'Kanit', sans-serif;
  position: absolute;
  bottom: 0;
  left: 140px;
  width: 30%;
  color: white;
`

export default FooterMenu;

FooterMenu.propTypes = {
  index: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}
