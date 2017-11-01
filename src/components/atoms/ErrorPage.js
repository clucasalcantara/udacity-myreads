import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ErrorPage = (props) => {
  const { results, handleTextChange } = props
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={e => handleTextChange(e)}
            placeholder="Search by title or author"
          />
        </div>
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