import React, { useState } from 'react'

function Navbar(props) {

  const [query, setQuery] = useState('')
  const [localQuery, setLocalQuery] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    props.handleSearch(query)
  }

  const handleLocalSubmit = e => {
    e.preventDefault()
    props.handleLocalSearch(localQuery)
  }

  return (
    <div className="navbar">
      <div className="navbar__filter">
        <button onClick={() => props.setFilter('all')}>All</button>
        <button onClick={() => props.setFilter('even')}>Even</button>
        <button onClick={() => props.setFilter('odd')}>Odd</button>
      </div>
      <div className="navbar__title"></div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Search Title"/>
      </form>
      <form onSubmit={handleLocalSubmit}>
        <input type="text" onChange={(e) => setLocalQuery(e.target.value)} placeholder="Search Title Locally"/>
      </form>
    </div>
  )
}

export default Navbar
