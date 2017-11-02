import React from 'react'
import PropTypes from 'prop-types'

const Empty = ({ text }) => (
  <div className="search-box-message">
    <div className="search-message--wrapper">
      <h1 className="search-message">{text}</h1>
    </div>
  </div>
)

Empty.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Empty