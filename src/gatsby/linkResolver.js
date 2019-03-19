const linkResolver = doc => {
  console.log(doc)
  if (doc.slug === 'post') return `/blog/${doc.uid}`
}

module.exports = linkResolver
