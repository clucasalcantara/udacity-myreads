import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'

import BookShelf from '../../organisms/BookShelf'

import { getAll, update } from '../../../services/BooksAPI'

import './style.css'

class BookShelves extends Component {
  state = {
    shelves: [],
    loading: true,
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
      ],
      loading: false
    })
  }

  handleChange = (e, book) => {
    const { value } = e.target
    update(book, value).then(res => {
      this.getBooks()
    })
  }

  displayLoading = () => (
    <div className="loading">
      <ReactLoading
        type='bubbles'
        color='purple'
        height={250}
        width={100}
      />
    </div>
  )
    
  render() {
    const { loading, shelves } = this.state
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {loading && this.displayLoading()}
              {
                shelves.map(shelf => (
                  <BookShelf
                    key={shelf.title}
                    handleChange={this.handleChange}
                    data={Object.values(shelf)[1]}
                    title={shelf.title}
                  />
                ))
              }
            </div>
          </div>
          <div className="open-search">
            <Link to={{
              pathname: '/search',
              handleChange: this.handleChange
            }}>
              Add a book
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves
