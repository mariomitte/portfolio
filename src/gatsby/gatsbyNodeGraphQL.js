const gatsbyNodeGraphQL = `
  posts: allPrismicPost(sort: { fields: [data___date], order: DESC }) {
    edges {
      node {
        uid
        data {
          title {
            text
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
        }
      }
    }
  }
`

module.exports = gatsbyNodeGraphQL
