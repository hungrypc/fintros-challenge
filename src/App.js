import React, { useState, useEffect, useRef, useCallback } from 'react';

import Article from './components/Article';
import Navbar from './components/Navbar'
import { fetchArticles } from './api/hackerNewsAPI';
import useArticleSearch from './utility/useArticleSearch'

import './style/css/App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const observer = useRef()
  const lastArticleRef = useCallback(node => {
    // console.log(node)
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log('visible')
        setPage(prevPage => prevPage = prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  })

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPage(1)
  }

  // returns number of articles per page
  const paginate = () => {
    const numOfArticles = page * 30;
    return articles.slice(0, numOfArticles)
  }

  useEffect(() => {
    fetchArticles().then(allArticles => {
      setArticles(allArticles)
      setLoading(false)
    })
  }, []);


  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="App">
        <Navbar handleSearch={handleSearch}/>
        {paginate().map((article, index) => {
          if (index === (page * 30) - 1) {
            return <Article key={article} id={article} lastArticleRef={lastArticleRef}/>
          } else {
            return <Article key={article} id={article}/>
          }
        })}
      </div>
    );
  }
};

export default App;
