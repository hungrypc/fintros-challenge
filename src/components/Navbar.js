import React, { useState } from 'react'

function Navbar(props) {

  const [query, setQuery] = useState('')

  return (
    <div className="navbar">
      <div className="navbar__filter">
        <button onClick={() => props.setFilter('all')}>All</button>
        <button onClick={() => props.setFilter('even')}>Even</button>
        <button onClick={() => props.setFilter('odd')}>Odd</button>
      </div>
      <div className="navbar__title"></div>
      <input type="text" onChange={(e) => setQuery(e.target.value)}></input>
      <button onClick={() => props.handleSearch(query)}>Search Title</button>
    </div>
  )
}

export default Navbar
