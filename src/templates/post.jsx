import React from "react"
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from "gatsby"
import { SEO, TemplateLayout, Video, Gallery } from '../components'

import website from '../../config'

const Post = ({ data: { prismicPost }, location }) => {
  const { data } = prismicPost
  const image = data.image.localFile.childImageSharp.fluid

  // let categories = false
  // if (data.categories[0].category) {
  //   categories = data.categories.map(c => c.category.document[0].data.name)
  // }

  return (
    <TemplateLayout type={data.title.text} back="/blog/" image={image}>
      <SEO
        title={`${data.title.text} | ${website.siteTitleAlt}`}
        pathname={location.pathname}
        desc={data.description}
        node={prismicPost}
        image={image}
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
                aspectRatio
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        embed {
          embed_url
        }
        body {
          items {
            gallery_image {
              localFile {
                childImageSharp {
                  fluid {
                    aspectRatio
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
