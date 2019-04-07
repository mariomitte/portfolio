import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, graphql } from "gatsby"

import TemplateLayout from '../components/TemplateLayout'
import Header from '../components/Header';

const Places = ({ data }) => {

  let placesItem = data.allPrismicPlaces.edges.map((item, i) => {
    let at = "/places/"
    return (
      <StyledLink to={`${at}${item.node.uid}`} key={i}>
        <PostList>
          <Wrapper>
            <Header
              title={item.node.data.title.text}
              span={item.node.data.date}
            />
          </Wrapper>
        </PostList>
      </StyledLink>
    )
  })

  return (
    <TemplateLayout type="Places">
      {placesItem}
    </TemplateLayout>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2rem;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const PostList = styled.div`
  width: 100%;
  height: 200px;
  margin: .5rem 0;
`;

const Wrapper = styled.div`
  padding: 0 2rem;
`;

export default Places;

Places.propTypes = {
  data: PropTypes.shape({
    allPrismicPlaces: PropTypes.object.isRequired,
  }).isRequired,
}

export const blogQuery = graphql`
  query PlacesPageQuery {
    allPrismicPlaces(sort: { fields: [data___date], order: DESC }) {
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
