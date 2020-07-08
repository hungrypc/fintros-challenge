import React, { useState, useEffect, useRef, useCallback } from 'react';

import Navbar from './components/Navbar'
import Article from './components/Article';
import { fetchArticles } from './api/hackerNewsAPI';

import './style/css/App.css';
import './style/css/style.css'

function App() {
  const [articlesList, setArticlesList] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

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
  }, [])


  const handleSearch = (value) => {
    setQuery(value)
    setPage(1)
  }

  useEffect(() => {
    fetchArticles(page, query)
      .then(articles => {
        if (page < 2) {
          setArticlesList(articles)
        } else {
          setArticlesList(prevArticles => {
            return [...new Set([...prevArticles, ...articles])]
          })
        }
        setLoading(false)
      })
  }, [page, filter, query])


  return (
    <div className="App">
      <Navbar handleSearch={handleSearch} setFilter={setFilter} />
      <div className="hero"></div>
      <div className="articles-list">
        {articlesList.map((article, index) => (
          <Article key={article.id} article={article}
            lastArticleRef={index === articlesList.length - 1 ? lastArticleRef : null}
          />
        ))}
        <div>{page < 6 ? 'More Articles' : 'All Articles Loaded'}</div>
      </div>
    </div>
  );

};

export default App;
