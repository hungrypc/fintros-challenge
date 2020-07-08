import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

const Button = styled.button`
  font-size: .8rem;
  font-weight: 500;
  border: 1px solid #e1e1e1;
  padding: 7px 18px;
  border-radius: 4px;
  color: #a7a7a7;
  cursor: pointer;
  transition: all .2s ease;
  font-weight: 600;
  outline: none;

  ${props => props.filter && css `
    border: 1px solid #99c8ef;
    background-color: #99c8ef;
    color: #fff;
  `}
`

const Input = styled.input`
  font-size: .8rem;
  border-radius: 4px;
  padding: 7px 18px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
`

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
        <Button 
          className={"navbar__filter--btn"} 
          filter={props.filter === 'all'}
          onClick={() => props.handleFilter('all')}
        >
          All
        </Button>
        <Button 
          className="navbar__filter--btn" 
          filter={props.filter === 'even'}
          onClick={() => props.handleFilter('even')}
        >
          Even
        </Button>
        <Button 
          className="navbar__filter--btn" 
          filter={props.filter === 'odd'}
          onClick={() => props.handleFilter('odd')}
        >
          Odd
        </Button>
      </div>
      <div className="navbar__search">
        <form onSubmit={handleSubmit}>
          <Input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Search Title" />
        </form>
        <form onSubmit={handleLocalSubmit}>
          <Input type="text" onChange={(e) => setLocalQuery(e.target.value)} placeholder="Search Title Locally" />
        </form>
      </div>
    </div>
  )
}

export default Navbar
