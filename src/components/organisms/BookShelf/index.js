import React from 'react'

import Book from '../../molecules/Book'

const BookShelf = (props) => {
  const { data } = props
  delete props.data.title
  const books = Object.entries(props.data)[0][1]

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{data.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => <Book data={book} />)}
        </ol>
      </div>
    </div>
  )
}

export default BookShelf
