import React from "react"
import { graphql } from "gatsby"

const Image = ({ data }) => {
  console.log(data)
  return (
    <div>
      <div>Hello world</div>
    </div>
  )
}

export const query = graphql`
  query NavbarOfflineImageQuery {
    allFile {
      edges {
        node {
          id
        }
      }
    }
  }
`

export default Image;
