import React from 'react'
import { Link, graphql } from "gatsby"

const Blog = () => (
  <div>
    <span>Back to: <Link to={'/'}>@Mario</Link></span>
    <p>Blog Posts</p>
  </div>
)

export default Blog;
