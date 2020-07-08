import React, { useState, useEffect } from 'react'

function Navbar(props) {

  const [query, setQuery] = useState('')
  const [localQuery, setLocalQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    props.handleSearch(query)
  }

  const handleLocalSubmit = e => {
    e.preventDefault()
    props.handleLocalSearch(localQuery)
  }

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      if (!scrolled) {
        setScrolled('scroll-border')
      }
    } else {
      if (scrolled) {
        setScrolled('')
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [window.pageYOffset])

  return (
    <div className={`navbar ${props.darkMode ? 'dark' : 'light'} ${scrolled}`}>
      <div className="navbar__filter">
        <div className="navbar__filter--dark"
          onClick={props.handleDarkModeToggle}
        >
          {props.darkMode ? <i className="fas fa-moon"></i> : <i className="far fa-moon"></i>}
        </div>
        <div className="navbar__filter--btn" onClick={() => props.setFilter('all')}>All</div>
        <div className="navbar__filter--btn" onClick={() => props.setFilter('even')}>Even</div>
        <div className="navbar__filter--btn" onClick={() => props.setFilter('odd')}>Odd</div>
      </div>
      <div className="navbar__title">

      </div>
      <div className="navbar__search">
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Search Title" />
        </form>
        <form onSubmit={handleLocalSubmit}>
          <input type="text" onChange={(e) => setLocalQuery(e.target.value)} placeholder="Search Title Locally" />
        </form>
      </div>
      <div></div>
    </div>
  )
}

export default Navbar
