const path = require("path")
const gatsbyNodeGraphQL = require('./src/gatsby/gatsbyNodeGraphQL')

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Path to templates
  const postTemplate = require.resolve('./src/templates/post.jsx')
  const projectTemplate = require.resolve('./src/templates/project.jsx')
  const placesTemplate = require.resolve('./src/templates/places.jsx')

  const result = await wrapper(
    graphql(`
      {
        ${gatsbyNodeGraphQL}
      }
    `)
  )

  result.data.posts.edges.forEach(post => {
    createPage({
      path: `/blog/${post.node.uid}`,
      component: postTemplate,
      context: {
        uid: post.node.uid,
      },
    })
  })

  result.data.projects.edges.forEach(project => {
    createPage({
      path: `/projects/${project.node.uid}`,
      component: projectTemplate,
      context: {
        uid: project.node.uid,
      },
    })
  })

  result.data.places.edges.forEach(places => {
    createPage({
      path: `/places/${places.node.uid}`,
      component: placesTemplate,
      context: {
        uid: places.node.uid,
      },
    })
  })
}
