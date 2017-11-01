import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'

import BookShelf from '../../organisms/BookShelf'

import { getAll, update } from '../../../services/BooksAPI'

import './style.css'

class BookShelves extends Component {
  state = {
    shelves: [],
    isLoading: true,
  }
  
  componentDidMount = () => {
    this.getBooks()
  }

  getBooks = async () => {
    const shelves = await getAll()
    const currentlyReading = shelves.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = shelves.filter(book => book.shelf === 'wantToRead')
    const read = shelves.filter(book => book.shelf === 'read')

    this.setState({ 
      isLoading: false,
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
    this.setState({ isLoading: true })
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
        height={150}
        width={50}
      />
    </div>
  )
    
  render() {
    const { isLoading, shelves } = this.state
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          {isLoading && this.displayLoading()}
          {!isLoading &&
            <div>
              <div className="list-books-content">
                <div>
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
          }
        </div>
      </div>

    )
  }
}

export default BookShelves
