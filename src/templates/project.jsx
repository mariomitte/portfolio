import React from "react"
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, graphql } from "gatsby"
import { SEO, TemplateLayout } from '../components'

import website from '../../config'

const Post = ({ data: { prismicProjects }, location }) => {
  const { data } = prismicProjects

  return (
    <TemplateLayout type={data.title.text}>
      <SEO
        title={`${data.title.text} | ${website.siteTitleAlt}`}
        pathname={location.pathname}
        desc={data.description}
        node={prismicProjects}
        article
      />
      <Wrapper>
        <Container>
          <PostList>
            <p>{data.text.text}</p>
          </PostList>
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
