import React from 'react'
import PropTypes from 'prop-types'

import Book from '../../molecules/Book'

const BookShelf = ({ data = [], title = null, handleChange }) => {
  return (
    <div className="bookshelf">
      {title && <h2 className="bookshelf-title">{title}</h2>}
      <div className="bookshelf-books">
        <ol className="books-grid">
          {data.map(book => <Book key={book.title} updateShelf={handleChange} data={book} />)}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
}

export default BookShelf
