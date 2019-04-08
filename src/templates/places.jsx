import React from "react"
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from "gatsby"
import { SEO, TemplateLayout, Video, Gallery } from '../components'

import website from '../../config'

const Places = ({ data: { prismicPlaces }, location }) => {
  const { data } = prismicPlaces
  const image = data.image.localFile.childImageSharp.fluid
  console.log(image.src)
  const geolocation = data.location

  return (
    <TemplateLayout type={data.title.text} back="/places/" image={image} geolocation={geolocation}>
      <SEO
        title={`${data.title.text} | ${website.siteTitleAlt}`}
        pathname={location.pathname}
        desc={data.description}
        node={prismicPlaces}
        image={image}
        article
      />
      <Wrapper>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', height: '100%' }}>
          <Video src={data.embed.embed_url} />
        </div>
        <Container>
          <PostList style={{ padding: '1rem 0' }}>
            <div dangerouslySetInnerHTML={{ __html: data.content.html }} />
          </PostList>
        </Container>
        <Gallery data={data.body} />
      </Wrapper>
    </TemplateLayout>
  )
}

const Container = styled.div`
  padding: 0 2rem;

  @media (max-width: 700px) {
    padding: 0 0.5rem;
  }
`;

const PostList = styled.div`
  width: 100%;
  margin: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 2rem;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

export default Places

Places.propTypes = {
  data: PropTypes.shape({
    prismicPlaces: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query PlacesPost($uid: String!) {
    prismicPlaces(uid: { eq: $uid }) {
      uid
      first_publication_date
      last_publication_date
      data {
        title {
          text
        }
        description
        date(formatString: "DD.MM.YYYY")
        content {
          text
          html
        }
        location {
          latitude
          longitude
        }
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1080, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
              resize(width: 1920, quality: 90) {
                src
                height
                width
              }
            }
          }
        }
        embed {
          embed_url
          title
          html
        }
        body {
          items {
            gallery_image {
              url
              localFile {
                childImageSharp {
                  fluid {
                    aspectRatio
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            image_captions {
              html
            }
          }
        }
      }
    }
  }
`
