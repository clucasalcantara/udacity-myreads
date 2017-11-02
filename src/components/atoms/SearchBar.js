import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'

const SearchBar = ({ handleTextChange }) => (
  <div className="search-books-input-wrapper">
    <input
      type="text"
      onChange={e => debounce(handleTextChange(e), 500)}
      placeholder="Search by title or author"
    />
  </div>
)

SearchBar.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
}

export default SearchBar
