import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import { SEO, TemplateLayout, Video } from '../components'
import Header from '../components/Header';

import website from '../../config'

const AboutMe = ({ data: { prismicAboutMe }, location }) => {
  const { data } = prismicAboutMe
  const image_header = data.image_header.localFile.childImageSharp.fluid
  const zajedno_image = data.zajedno_image.localFile.childImageSharp.fluid


  return (
    <TemplateLayout type={data.title.text} image={image_header}>
      <SEO
        title={`${data.title.text} | ${website.siteTitleAlt}`}
        pathname={location.pathname}
        node={prismicAboutMe}
        desc={website.siteDescription}
        image={image_header}
      />
      <Wrapper>
        <Container>
          <PostList dangerouslySetInnerHTML={{ __html: data.content.html }} />
        </Container>
        <Video src={data.project_video.embed_url} />
        <Container>
          <PostList dangerouslySetInnerHTML={{ __html: data.project_content.html }} />
        </Container>
        <ImageContainer fluid={zajedno_image} />
        <Container>
          <PostList dangerouslySetInnerHTML={{ __html: data.zajedno_content.html }} />
        </Container>
      </Wrapper>
    </TemplateLayout>
  )
}

const ImageContainer = styled(Img)`
  position: relative;
  z-index: -1;
  height: 100%;
  width: 100%;
`

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
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2rem;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

const Paragraph = styled.p``


export default AboutMe;

AboutMe.propTypes = {
  data: PropTypes.shape({
    prismicAboutMe: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const blogQuery = graphql`
  query AboutMePageQuery {
    prismicAboutMe {
      data {
        title {
          text
        }
        content {
          html
        }
        image_header {
          localFile {
            childImageSharp {
              fluid {
                src
                aspectRatio
              }
            }
          }
        }
        project_video {
          embed_url
        }
        project_content {
          html
        }
        zajedno_image {
          localFile {
            childImageSharp {
              fluid {
                src
                aspectRatio
              }
            }
          }
        }
        zajedno_content {
          html
        }
      }
    }
  }
`
