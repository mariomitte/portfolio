import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../ButtonAction'
import ArrowItem from '../ArrowItem'
import BlogPosts from './BlogPosts'
import Projects from './Projects'
import Places from './Places'

import 'typeface-raleway'

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
    const { index, color, onModal } = this.props

    if(index === 0) {
      return (
        <Wrapper onClick={onModal}>
          <Position>
            Show me your love
          </Position>
        </Wrapper>
      )
    }
    if(index === 1) {
      return (
        <Wrapper>
          <BlogPosts
            pop={pop}
            toggle={toggle}
            onPop={this.pop}
            onToggle={this.toggle}
          />
          <Position>
            <Paragraph>#mario</Paragraph>
            <Button
              color={color}
              children={<span>Posts</span>}
              arrow={<ArrowItem color="true" direction={pop ? "down" : "up"} />}
              onClick={this.pop}
            />
          </Position>
        </Wrapper>
      )
    }
    if(index === 2) {
      return (
        <Wrapper>
          <Projects
            pop={pop}
            toggle={toggle}
            onPop={this.pop}
            onToggle={this.toggle}
          />
          <Position>
            <Paragraph>#projects</Paragraph>
            <Button
              color={color}
              children={<span>Projects</span>}
              arrow={<ArrowItem color="true" direction={pop ? "down" : "up"} />}
              onClick={this.pop}
            />
          </Position>
        </Wrapper>
      )
    }
    if(index === 3) {
      return (
        <Wrapper>
          <Places
            pop={pop}
            toggle={toggle}
            onPop={this.pop}
            onToggle={this.toggle}
          />
          <Position>
            <Paragraph>#places</Paragraph>
            <Button
              color={color}
              children={<span>Places</span>}
              arrow={<ArrowItem color="true" direction={pop ? "down" : "up"} />}
              onClick={this.pop}
            />
          </Position>
        </Wrapper>
      )
    }
  }
}

const Position = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  width: 100%;
`

const Paragraph = styled.p`
  padding: 0;
  margin: 0;

  @media (max-width: 700px) {
    display: none;
  }
`

const Wrapper = styled.div`
  font-family: 'Kanit', sans-serif;
  position: absolute;
  bottom: 0;
  left: 140px;
  width: 30%;
  color: white;

  @media (max-width: 700px) {
    left: 0;
    width: 100%;
  }
`

export default FooterMenu;

FooterMenu.propTypes = {
  index: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}
