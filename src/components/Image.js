import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image'

const Image = () => (
  <StaticQuery
    query={graphql`
      query NavbarImageQuery {
        allFile(filter: { sourceInstanceName: { eq: "assets" } }) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 1080, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.allFile.edges
      console.log(image[0].node.childImageSharp.fluid.src)
      return (
        <ImageContainer fluid={image[0].node.childImageSharp.fluid} />
      )
    }}
  />
);

const ImageContainer = styled(Img)`
  height: 100%;
  width: 100%;
  right: 0;
  top: 0;
  overflow: hidden;
  z-index: -1;
`

export default Image;


// <StaticQuery
//   query={graphql`
//     query SiteTitleQuery {
//       site {
//         siteMetadata {
//           title
//         }
//       }
//     }
//   `}
//   render={data => (
//     <>
//       <ImageContainer style={styles}>
//         <SlopeEndGradient>
//           <Paragraph>
//             {type}
//           </Paragraph>
//           {back && <StyledLink to={back}>
//               explore
//             </StyledLink>
//           }
//         </SlopeEndGradient>
//       </ImageContainer>
//     </>
//   )}>
// />
