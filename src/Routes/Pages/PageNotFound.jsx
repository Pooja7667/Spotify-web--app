import React from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <>
    <Helmet>
      <title>Page Not Found</title>
    </Helmet>
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-4xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Go Back Home
      </Link>
    </div>
    </>
  )
}

export default PageNotFound