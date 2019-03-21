import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header = ({ title, span }) => {
  return (
    <Wrapper>
      <Title>
        {title}
      </Title>
      {span && <Span>{span}</Span>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 0;
`;
const Span = styled.span`

`;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  span: PropTypes.string,
}

export default Header;
