import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className='mb-6 border-b pb-4'>
        <header>
          <h1 className="text-gray-900 font-bold text-2xl text-blue-900">
            {post.frontmatter.title}
          </h1>
          <p className='text-gray-600 text-sm'>
            {post.frontmatter.date}
          </p>
        </header>
        <div className="inline">
          {post.frontmatter.tags.map(tag => {
            return (
              <Tag tag={tag} />
            )
          })}
        </div>
        <section className="text-base my-6 post" dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <Bio />
      </article>
      <nav className="text-sm hover:font-bold mb-10">
        <ul className="relative">
          <li className="inline-block absolute left-0">
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li className="inline-block absolute right-0">
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`
