import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from 'react-router-dom'

import {
  BookShelves,
  Search,
} from '../pages'

const RootContainer = () => (
  <Router>
    <Switch>
      <Route path="/" component={BookShelves} exact />
      <Route path="/search" component={Search} exact />
    </Switch>
  </Router>
)

export default RootContainer
