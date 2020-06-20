import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase";

const Tag = ({ tag }) => {
  const tagLink = "/tags/" + kebabCase(tag)

  return (
    <Link
      className="bg-gray-400 rounded text-sm mr-1 pl-3 pr-4 py-1 capitalize hover:bg-gray-500"
      to={tagLink}> {tag}</Link>
  )
}

export default Tag
