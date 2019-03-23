import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import './Parallax/style.css'

const Header = ({ title, span }) => {
  return (
    <div className="container">
      <Wrapper>
        <Title>
          {title}
        </Title>
        <Span>{span}</Span>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const Title = styled.h4`
  padding: 0;
`;
const Span = styled.p`
  margin: 0;
  padding: 0;
  color: #212121;
  font-size: 0.88em;

`;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  span: PropTypes.string,
}

export default Header;
