import React from "react"
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import { SEO, TemplateLayout } from '../components'

import website from '../../config'

const Post = ({ data: { prismicPost }, location }) => {
  const { data } = prismicPost
  const image = data.image.localFile.childImageSharp.fluid

  let categories = false
  if (data.categories[0].category) {
    categories = data.categories.map(c => c.category.document[0].data.name)
  }
  return (
    <TemplateLayout type={data.title.text} back="/blog/" image={image}>
      <SEO
        title={`${data.title.text} | ${website.siteTitleAlt}`}
        pathname={location.pathname}
        desc={data.description}
        node={prismicPost}
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

export default Post

Post.propTypes = {
  data: PropTypes.shape({
    prismicPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query BlogPost($uid: String!) {
    prismicPost(uid: { eq: $uid }) {
      uid
      first_publication_date
      last_publication_date
      data {
        title {
          text
        }
        description
        date(formatString: "DD.MM.YYYY")
        categories {
          category {
            document {
              data {
                name
              }
            }
          }
        }
        content {
          html
        }
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1080, quality: 90) {
                ...GatsbyImageSharpFluid
              }
              resize(width: 1920, quality: 90) {
                src
                height
                width
              }
            }
          }
        }
      }
    }
  }
`
