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
    setQuery(value)
    setPage(1)
  }

  const handleLocalSearch = value => {
    console.log('hit')
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
            setArticlesList(articles)
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
      />
      <div className="hero"></div>
      <div className="articles-list">
        <div className="articles-list__container">
          {articlesList.map((article, index) => {
            if (
              (filter === 'even' && (index + 1) % 2 === 0) ||
              (filter === 'odd' && (index + 1) % 2 !== 0) ||
              filter === 'all'
            ) {
              return <Article key={article.id} article={article} index={index + 1} localQuery={localQuery}
              // lastArticleRef={index === articlesList.length - 1 ? lastArticleRef : null}
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
