import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Card from '../Card'

// import 'typeface-raleway'

const Projects = ({ pop, toggle, onPop, onToggle }) => {
  return (
    <StaticQuery
      query={graphql`
        query FooterMenuProjectsQuery {
          allPrismicProjects {
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
            data={data.allPrismicProjects.edges}
            at="/projects/"
          />
        );
      }}
    />
  )
}

export default Projects;

Projects.propTypes = {
  pop: PropTypes.bool.isRequired,
  toggle: PropTypes.bool.isRequired,
  onPop: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
}
