import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image'

const Gallery = ({ data }) => {
  // console.log(data[0].items.map(item => item.gallery_image.url))
  let gallery = data[0].items

  return (
    <Wrapper>
      {gallery.map((item, i) => <Content key={i}>
          <figure style={{ position: 'relative', padding: 0, margin: 0 }}>
            {item.image_captions && <figcaption style={{ position: 'absolute', top: 0, left: 0, zIndex: 99, margin: 0, backgroundColor: 'whitesmoke', padding: '0 0 0 10px', opacity: 0.72, fontSize: '1rem', display: 'flex', flexWrap: 'wrap', width: 'calc(100% - 10px)' }}
              dangerouslySetInnerHTML={{ __html: item.image_captions.html }}
            />}
            <Img fluid={item.gallery_image.localFile.childImageSharp.fluid} />
          </figure>
        </Content>
      )}
    </Wrapper>
  )
}

const Content = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 0;
`

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default Gallery;

Gallery.propTypes = {
  data: PropTypes.array.isRequired,
}
