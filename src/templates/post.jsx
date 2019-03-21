import React from "react"
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, graphql } from "gatsby"
import { SEO, TemplateLayout } from '../components'

import website from '../../config'

const Post = ({ data: { prismicPost }, location }) => {
  const { data } = prismicPost
  let categories = false
  if (data.categories[0].category) {
    categories = data.categories.map(c => c.category.document[0].data.name)
  }
  return (
    <TemplateLayout type="Blog Posts">
      <SEO
        title={`${data.title.text} | ${website.siteTitleAlt}`}
        pathname={location.pathname}
        desc={data.description}
        node={prismicPost}
        article
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '50px', padding: '0 1rem' }}>
        <span>Back to: <Link to={'/blog/'}>Blog Posts</Link></span>
      </div>
      <Wrapper dangerouslySetInnerHTML={{ __html: data.content.html }} />
    </TemplateLayout>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 2rem;
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
      }
    }
  }
`
