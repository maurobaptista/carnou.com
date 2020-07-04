import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"
import Tag from "../components/tag"

const TagsPage = ({location, data}) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="All Tags"
        description="All tags"
      />
      <article className='mb-6 border-b pb-4'>
        <header className="mb-4">
          <h1 className="text-gray-900 font-bold text-2xl text-blue-900">
            Tags
          </h1>
        </header>

        <ul className="mb-12">
          {data.allMarkdownRemark.group.map(tag => {
              return (
                <li>
                  <Tag tag={tag.fieldValue} />
                  <span className="text-sm bg-blue-600 rounded-full text-white py-1 px-2">{tag.totalCount}</span>
                </li>
              )
            }
          )}
        </ul>

        <hr />
        <Bio />
      </article>
    </Layout>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`