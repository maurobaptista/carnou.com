import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let headerFontSize

  headerFontSize = (location.pathname === rootPath)
    ? 'text-4xl'
    : 'text-2xl';

  return (
    <div className={'max-w-6xl my-4 mx-4 lg:mx-auto ' + headerFontSize}>
      <h1 className='text-4xl font-bold mb-6 text-blue-700 hover:text-blue-600'>
        <Link to={`/`}>
          {title}
        </Link>
      </h1>
      <main className='bg-white rounded shadow-md p-6'>{children}</main>
      <footer className='w-full text-center border-t text-sm text-gray-600 border-grey p-4 mt-4 pin-b'>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
