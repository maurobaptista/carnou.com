import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
          tags: array
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug} className='mb-6 border-b pb-6'>
            <header className="mb-4">
              <h3 className="hover:text-blue-800 text-blue-600 font-bold text-2xl">
                <Link to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <p className='text-gray-600 text-sm'>{node.frontmatter.date}</p>
            </header>
            <section className="text-base">
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
            <footer className="inline">
              {node.frontmatter.tags.map(tag => {
                const tagLink = "/tags/" + kebabCase(tag)
                return (
                    <Link
                        className="bg-gray-400 rounded text-sm mr-1 pl-3 pr-4 py-1 capitalize hover:bg-gray-500"
                        to={tagLink}> {tag}</Link>
                )
              })}
            </footer>
          </article>
        )
      })}
      <Bio />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
