import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookShelf from '../../organisms/BookShelf'

import { getAll, update } from '../../../services/BooksAPI'

import './style.css'

class BookShelves extends Component {
  state = {
    shelves: [],
  }
  
  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    const shelves = await getAll()
    const currentlyReading = shelves.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = shelves.filter(book => book.shelf === 'wantToRead')
    const read = shelves.filter(book => book.shelf === 'read')

    this.setState({ 
      shelves: [
        {
          title: 'Currently Reading',
          currentlyReading
        },
        {
          title: 'Want To Read',
          wantToRead
        },
        {
          title: 'Read',
          read
        }
      ]
    })
  }

  handleChange = (e, book) => {
    const { value } = e.target
    update(book, value).then(res => {
      const { updatedBooksIds } = res
      this.updateBooks(value, book, res)
    })
  }

  updateBooks = (value, book, res) => {
    console.log(value, book, res)
  }

  renderShelves = (shelves) => {
    if (shelves.length > 0) {
      return shelves.map(shelf => {
        const books = Object.values(shelf)[1]

        return (
          <BookShelf
            key={shelf.title}
            handleChange={this.handleChange} 
            data={books}
            title={shelf.title}
          />
        )
      })
    }
  }

  drawContent = (shelves) => (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.renderShelves(shelves)}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  )
  
  render() {
    const { shelves } = this.state
    
    return shelves.length > 0 ? this.drawContent(shelves) : null
  }
}

export default BookShelves
