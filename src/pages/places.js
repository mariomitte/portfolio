import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, graphql } from "gatsby"

import TemplateLayout from '../components/TemplateLayout'
import Header from '../components/Header';

const Places = () => {

  // let blogItem = data.allPrismicPost.edges.map((item, i) => {
  //   let at = "/blog/"
  //   return (
  //     <StyledLink to={`${at}${item.node.uid}`} key={i}>
  //       <PostList>
  //         <Wrapper>
  //           <Header
  //             title="{item.node.data.title.text}"
  //             span={item.node.data.date}
  //           />
  //         </Wrapper>
  //       </PostList>
  //     </StyledLink>
  //   )
  // })

  // return (
  //   <TemplateLayout type="Blog Posts">
  //     {blogItem}
  //   </TemplateLayout>
  // );

  return (
    <TemplateLayout type="Places I Visit">
      <p>Places I visit</p>
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
