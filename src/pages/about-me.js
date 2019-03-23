import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, graphql } from "gatsby"

import TemplateLayout from '../components/TemplateLayout'
import Header from '../components/Header';

const AboutMe = () => (
  <TemplateLayout type="Blog Posts">
    <Paragraph>About Me</Paragraph>
  </TemplateLayout>
)

const Paragraph = styled.p``


export default AboutMe;
