const linkResolver = ({ node, key, value }) => doc => {
  console.log(doc)

  const prefix = `${doc.uid}`

  if (doc.type === 'post') return `/blog/${doc.uid}`

  return `${prefix}`
}

module.exports = linkResolver
