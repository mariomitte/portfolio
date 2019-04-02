import React from "react"
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, graphql } from "gatsby"
import { SEO, TemplateLayout } from '../components'

import Video from '../components/Video'

import website from '../../config'

const Places = ({ data: { prismicPlaces }, location }) => {
  const { data } = prismicPlaces
  const image = data.image.localFile.childImageSharp
  const video = '<iframe type="text/html" width="100%" height="500px" src=${data.embed.embed_url} frameborder="0"/>'

  return (
    <TemplateLayout type={data.title.text} back="/places/" image={image}>
      <SEO
        title={`${data.title.text} | ${website.siteTitleAlt}`}
        pathname={location.pathname}
        desc={data.description}
        node={prismicPlaces}
        article
      />
      <Wrapper>
        <Container>
          <PostList>
            <div dangerouslySetInnerHTML={{ __html: data.content.html }} />
          </PostList>
        </Container>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', height: '100%' }}>
          <Video src={data.embed.embed_url} />
        </div>
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
  margin: .5rem 0;
  min-height: 200px;
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
      }
    }
  }
`
