import React from 'react'
import ReactLoading from 'react-loading'

const Loading = () => (
  <div className="loading">
    <ReactLoading
      type='bubbles'
      color='purple'
      height={250}
      width={100}
    />
  </div>
)

export default Loading
