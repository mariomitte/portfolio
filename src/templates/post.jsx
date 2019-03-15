import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import { SEO } from '../components'

import website from '../../config'

const Post = ({ data: { prismicPost }, location }) => {
  const { data } = prismicPost
  let categories = false
  if (data.categories[0].category) {
    categories = data.categories.map(c => c.category.document[0].data.name)
  }
  return (
    <React.Fragment>
      <SEO
        title={`${data.title.text} | ${website.siteTitleAlt}`}
        pathname={location.pathname}
        desc={data.description}
        node={prismicPost}
        article
      />
      <h1>{data.title.text}</h1>
      <span>{categories}</span>
      <div dangerouslySetInnerHTML={{ __html: data.content.html }} />
    </React.Fragment>
  )
}

export default Post

Post.propTypes = {
  data: PropTypes.shape({
    prismicPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {
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
