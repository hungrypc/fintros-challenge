import React, { useState, useEffect, useRef, useCallback } from 'react';

import Navbar from './components/Navbar'
import Article from './components/Article';
import { fetchArticles } from './api/hackerNewsAPI';

import './style/css/style.css'

function App() {
  const [articlesList, setArticlesList] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [localQuery, setLocalQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [darkMode, setDarkMode] = useState(false)

  // infinite scrolling
  const observer = useRef()
  const lastArticleRef = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // should make this dynamic
        if (page < 6) {
          setPage(prevPage => prevPage = prevPage + 1)
        }
      }
    })
    if (node) observer.current.observe(node)
  }, [page])


  const handleSearch = value => {
    setFilter('all')
    setQuery(value)
    setLocalQuery('')
    setPage(1)
    setLoading(true)
  }

  const handleLocalSearch = value => {
    setLocalQuery(value)
  }

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchArticles(page, query)
      .then(articles => {
        if (mounted) {
          if (page < 2) {
            setArticlesList([...new Set([...articles])])
          } else {
            setArticlesList(prevArticles => {
              return [...new Set([...prevArticles, ...articles])]
            })
          }
          setLoading(false)
        }
      })
    return () => {
      mounted = false
    }
  }, [page, filter, query])


  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <Navbar 
        handleSearch={handleSearch} 
        handleLocalSearch={handleLocalSearch} 
        setFilter={setFilter} 
        handleDarkModeToggle={handleDarkModeToggle} 
        darkMode={darkMode}
      />
      <div className="hero">
        <div className="hero__header">Hacker News</div>
        <div className="hero__subheader">{"{  Best Stories  }"}</div>
      </div>
      <div className="articles-list">
        <div className="articles-list__container">
          {loading ? <div>Loading Articles</div> : null}
          {articlesList.map((article, index) => {
            if (
              (filter === 'even' && (index + 1) % 2 === 0) ||
              (filter === 'odd' && (index + 1) % 2 !== 0) ||
              filter === 'all'
            ) {
              return <Article key={article.id} article={article} index={index + 1} localQuery={localQuery}              
              />
            } else {
              return null
            }
          })}
          {loading ?
            null
            :
            <div ref={lastArticleRef}>{page < 6 ? 'More Articles' : 'All Articles Loaded'}</div>
          }
        </div>
      </div>
    </div>
  );

};

export default App;
