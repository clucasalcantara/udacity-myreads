import React from 'react'

const Book = ({ data }) => {
  console.log(data)
  const bookInfo = {
    title: data.title,
    cover: data.imageLinks.thumbnail || data.imageLinks.smallThumbnail,
    shelf: data.shelf,
    authors: data.authors,
  }

  return (
      <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookInfo.cover}")` }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Book