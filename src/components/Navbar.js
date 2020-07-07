import React from 'react'

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="navbar__title"></div>
      <input type="text" onChange={() => props.handleSearch()}></input>
    </div>
  )
}

export default Navbar
