import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { SearchBar } from '../atoms'

const ErrorPage = (props) => {
  const { results, handleTextChange } = props
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <SearchBar handleTextChange={handleTextChange} />
      </div>
      <div className="search-message--wrapper">
        <h1 className="search-message">
          Error on search: {`${results.error}`}
        </h1>
      </div>
    </div>
  )
}

ErrorPage.propTypes = {
  results: PropTypes.object.isRequired,
}

export default ErrorPage
