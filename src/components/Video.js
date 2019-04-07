import React from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

const Video = ({ src }) => {
  console.log(src)
  return (
    <Wrapper>
      <Player
        url={src}
        playing
        width="100%"
        height="100%"
        config={{
          youtube: {
            playerVars: { 'autoplay': 1, 'controls': 0, 'autohide':1, 'wmode':'opaque', 'origin': 'http://localhost:8000' }
          },
          facebook: {
            appId: '12345'
          }
        }}
      />
    </Wrapper>
  )
}

const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  width: 100%;
`

export default Video;
