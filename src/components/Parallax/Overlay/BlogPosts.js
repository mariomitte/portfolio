import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Card from '../Card'

// import 'typeface-raleway'

const BlogPosts = ({ pop, toggle, onPop, onToggle }) => {
  return (
    <StaticQuery
      query={graphql`
        query FooterMenuBlogPostsQuery {
          allPrismicPost(
            limit: 4
          ) {
            edges {
              node {
                uid
                data {
                  title {
                    text
                  }
                  date(formatString: "DD.MM.YYYY")
                }
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <Card
            pop={pop}
            toggle={toggle}
            onPop={onPop}
            onToggle={onToggle}
            data={data.allPrismicPost.edges}
            at="/blog/"
          />
        );
      }}
    />
  )
}

export default BlogPosts;

BlogPosts.propTypes = {
  pop: PropTypes.bool.isRequired,
  toggle: PropTypes.bool.isRequired,
  onPop: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
}
