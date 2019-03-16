import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Card from '../Card'
import Button from '../ButtonAction'
import ArrowItem from '../ArrowItem'

const items = ["home page", "blog", "about me", "contact"];

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
        render={data => (
          <Wrapper>
            <Card pop={pop} toggle={toggle} onPop={this.pop} onToggle={this.toggle} data={data.allPrismicPost.edges} />
            <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ padding: 0, margin: 0 }}>Online space @Mario</p>
              <Button
                children={<span>Posts</span>}
                arrow={<ArrowItem color="true" direction={pop ? "down" : "up"} />}
                onClick={this.pop}
              />
            </div>
          </Wrapper>
        )}
      />
    );
  }
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 155px;
  width: 40%;
  color: white;
`

export default FooterMenu;
