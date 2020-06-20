import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"
import Post from "../components/post"

const Tags = ({ data, pageContext, location}) => {
  const { tag } = pageContext
  const siteTitle = data.site.siteMetadata.title
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with `

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={tag.frontmatter}
      />
      <article className='mb-6 border-b pb-4'>
        <header className="mb-4">
          <h1 className="text-gray-900 font-bold text-2xl text-blue-900">
            {tagHeader}<span className="capitalize">{tag}</span>
          </h1>
        </header>
        {edges.map(({ node }) => {
          const slug = node.fields
          const data = node.frontmatter

          return (
            <Post slug={slug} title={data.title} date={data.date} tags={data.tags}>
              <p
                dangerouslySetInnerHTML={{
                  __html: data.description || node.excerpt,
                }}
              />
            </Post>
          )
        })}
        <Bio />
      </article>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 160)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            tags
          }
        }
      }
    }
  }
`