import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'

import BookShelf from '../../organisms/BookShelf'
import { update, search } from '../../../services/BooksAPI'

class Search extends PureComponent {
  state = {
    query: '',
    results: [],
    isLoading: false,
  }

  handleTextChange = (e) => {
    this.setState({ isLoading: true })
    const query = e.target.value
    if (query.length >= 3) {
      search(query).then(res =>
        this.setState({ 
          results: res,
          isLoading: false,
        })
      )
    }
  }

  handleChange = (e, book) => {
    const { value } = e.target
    update(book, value).then(res => {
      this.setState({ isLoading: false })
      history.back()
    })
  }

  displayEmpty = () => (
    <div className="search-box-message">
      <div style={{ color: 'purple', marginTop: '10em', textAlign: 'center' }}>
        <h1 className="search-message">
          Nothing to show, search is empty
              </h1>
      </div>
    </div>
  )

  displayError = (results) => (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={e => this.handleTextChange(e)}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div style={{ color: 'purple', marginTop: '10em', textAlign: 'center' }}>
        <h1 className="search-message">
          Error on search: {`${results.error}`}
        </h1>
      </div>
    </div>
  )

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
    const { results , isLoading } = this.state    
    if (results.hasOwnProperty('error') && !isLoading) this.displayError(results)

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={e => this.handleTextChange(e)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        {isLoading && this.displayLoading()}
        {
          results.length > 0 && results.map((shelf, index) => (
            <BookShelf
              key={`shelf-${index}`}
              handleChange={this.handleChange}
              data={results}
            />
          ))
        }
        {(results.length === 0 && !isLoading) && this.displayEmpty()}
      </div>
    )
  }
}

export default Search