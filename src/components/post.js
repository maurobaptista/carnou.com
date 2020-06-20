import React from "react"
import { Link } from "gatsby"
import Tag from "./tag"

const Post = ({ location, slug, title, date, tags, children }) => {
  return (
    <article key={slug} className='mb-6 border-b pb-6'>
      <header className="mb-4">
        <h3 className="hover:text-blue-800 text-blue-600 font-bold text-2xl">
          <Link to={slug}>
            {title}
          </Link>
        </h3>
        <p className='text-gray-600 text-sm'>{date}</p>
      </header>
      <section className="text-base">
        {children}
      </section>
      <footer className="inline">
        {tags.map(tag => {
          return (
            <Tag tag={tag} />
          )
        })}
      </footer>
    </article>
  )
}

export default Post
