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
            <figcaption style={{ position: 'absolute', top: 0, left: 0, zIndex: 99, padding: 0, margin: 0, width: '100%', backgroundColor: 'whitesmoke', paddingLeft: '10px', opacity: 0.72, fontSize: '1rem', lineHeight: '0.1rem' }}
              dangerouslySetInnerHTML={{ __html: item.image_captions.html }}
            />
            <Img fluid={item.gallery_image.localFile.childImageSharp.fluid} />
          </figure>
        </Content>
      )}
    </Wrapper>
  )
}

const Content = styled.div`
  display: inline-block;
  width: calc(30% - 2px);
  margin-top: 1rem;

  @media (max-width: 700px) {
    width: 100%;
  }
`

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: -1
`;

export default Gallery;

Gallery.propTypes = {
  data: PropTypes.array.isRequired,
}
