import React from "react"
import PropTypes from 'prop-types'
import { Link, graphql } from "gatsby"
import { SEO } from '../components'

import website from '../../config'

const Post = ({ data: { prismicProjects }, location }) => {
  const { data } = prismicProjects

  return (
    <React.Fragment>
      <SEO
        title={`${data.title.text} | ${website.siteTitleAlt}`}
        pathname={location.pathname}
        desc={data.description}
        node={prismicProjects}
        article
      />
      <span>Back to: <Link to={'/'}>@Mario</Link></span>
      <h1>{data.title.text}</h1>
      <p>{data.text.text}</p>
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
  query ProjectPost($uid: String!) {
    prismicProjects(uid: { eq: $uid }) {
      uid
      first_publication_date
      last_publication_date
      data {
        title {
          text
        }
        description
        date(formatString: "DD.MM.YYYY")
        text {
          text
        }
      }
    }
  }
`
