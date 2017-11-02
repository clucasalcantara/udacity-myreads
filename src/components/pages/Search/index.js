import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { Loading, ErrorPage, Empty, SearchBar } from '../../atoms'
import BookShelf from '../../organisms/BookShelf'
import { update, search } from '../../../services/BooksAPI'

class Search extends PureComponent {
  state = {
    query: '',
    results: [],
    isLoading: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { results } = this.state
    return nextState.results !== results
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
  
  render() {
    const { state } = this.props.location
    const { results , isLoading } = this.state
    let searchResult = results   

    if (typeof state !== 'undefined') {
      if (state.length && results.length) {
        state.map(shelf => Object.values(shelf)[1].map(book => {
          return searchResult.map((searchedBook) => searchedBook.id === book.id ? Object.assign(searchedBook, book) : false)
        }))
      }
    }
    
    if (results.hasOwnProperty('error') && !isLoading) return <ErrorPage results={results} handleTextChange={this.handleTextChange} />

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <SearchBar handleTextChange={this.handleTextChange} />
        </div>
        {isLoading && <Loading />}
        {
          searchResult.length && <BookShelf
              key={`search-shelf`}
              handleChange={this.handleChange}
              data={searchResult}
            />
        }
        {(results.length === 0 && !isLoading) && <Empty text="Nothing to show, search is empty" />}
      </div>
    )
  }
}

export default Search