const gatsbyNodeGraphQL = `
  posts: allPrismicPost(sort: { fields: [data___date], order: DESC }) {
    edges {
      node {
        uid
        data {
          title {
            text
          }
          image {
            localFile {
              childImageSharp {
                resize(width: 600) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
  projects: allPrismicProjects(sort: { fields: [data___date], order: DESC }) {
    edges {
      node {
        uid
        data {
          title {
            text
          }
          image {
            localFile {
              childImageSharp {
                resize(width: 600) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
  places: allPrismicPlaces(sort: { fields: [data___date], order: DESC }) {
    edges {
      node {
        uid
        data {
          title {
            text
          }
          image {
            localFile {
              childImageSharp {
                resize(width: 600) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`

module.exports = gatsbyNodeGraphQL
