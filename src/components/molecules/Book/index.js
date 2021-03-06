import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ data = {}, updateShelf }) => {
  const bookInfo = {
    title: data.title,
    cover: data.imageLinks.thumbnail || data.imageLinks.smallThumbnail,
    shelf: data.shelf,
    authors: data.authors || [],
  }

  return (
      <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookInfo.cover}")` }}></div>
          <div className="book-shelf-changer">
            <select value={bookInfo.shelf} onChange={(event) => updateShelf(event, data)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookInfo.title}</div>
        <div className="book-authors">
          {
            bookInfo.authors.map(
              (author, index) => index > 0 ? `, ${author}`: author
            )    
          }
        </div>
      </div>
    </li>
  )
}

Book.propTypes = {
  data: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired,
}

Book.defaultProps = {
  data: {},
  updateShelf: () => {},
}

export default Book
