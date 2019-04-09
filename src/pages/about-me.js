import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, graphql } from "gatsby"

import { SEO, TemplateLayout } from '../components'
import Header from '../components/Header';

import website from '../../config'

const AboutMe = ({ data: { prismicAboutMe }, location }) => {
  const { data } = prismicAboutMe
  const image = data.image_header.localFile.childImageSharp.fluid

  return (
    <TemplateLayout type={data.title.text} image={image}>
      <SEO
        title={`${data.title.text} | ${website.siteTitleAlt}`}
        pathname={location.pathname}
        node={prismicAboutMe}
        image={image}
      />
      <Wrapper>
        <Container>
          <PostList dangerouslySetInnerHTML={{ __html: data.content.html }} />
        </Container>
      </Wrapper>
    </TemplateLayout>
  )
}

const Container = styled.div`
  padding: 0 2rem;
`;

const PostList = styled.div`
  width: 100%;
  margin: .5rem 0;
  min-height: 200px;
`;

const Wrapper = styled.div`
  display: flex;
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
      }
    }
  }
`
