import React from 'react'

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="navbar__filter">
        <button onClick={() => props.setFilter('all')}>All</button>
        <button onClick={() => props.setFilter('even')}>Even</button>
        <button onClick={() => props.setFilter('odd')}>Odd</button>
      </div>
      <div className="navbar__title"></div>
      <input type="text" onChange={() => props.handleSearch()}></input>
    </div>
  )
}

export default Navbar
