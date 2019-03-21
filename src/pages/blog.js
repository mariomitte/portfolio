import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, graphql } from "gatsby"

import TemplateLayout from '../components/TemplateLayout'
import Header from '../components/header';

const Blog = ({ data }) => {
  console.log("-- Blog --", data)

  let blogItem = data.allPrismicPost.edges.map((post, i) => {
    let at = "/blog/"
    return (
      <StyledLink to={`${at}${post.node.uid}`} key={i}>
        <PostList>
          <Wrapper>
            <Header
              title={post.node.data.title.text}
              span={post.node.data.date}
            />
          </Wrapper>
        </PostList>
      </StyledLink>
    )
  })

  return (
    <TemplateLayout type="Blog Posts">
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '50px', padding: '0 1rem' }}>
        <span>Back to: <Link to={'/'}>@Mario</Link></span>
      </div>
      {blogItem}
    </TemplateLayout>
  );
}

const Paragraph = styled.p``

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 2rem;
`;

const PostList = styled.div`
  width: 100%;
  height: 200px;
  border-bottom: 1px solid  gainsboro;
  margin: .5rem 0;
`;

const Wrapper = styled.div`
  padding: 0 2rem;
`;

export default Blog;

Blog.propTypes = {
  data: PropTypes.shape({
    allPrismicPost: PropTypes.object.isRequired,
  }).isRequired,
}

export const blogQuery = graphql`
  query BlogPageQuery {
    allPrismicPost(sort: { fields: [data___date], order: DESC }) {
      edges {
        node {
          uid
          data {
            title {
              text
            }
            date
          }
        }
      }
    }
  }
`
