import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar'
// import Article from './components/Article';
import ArticlesList from './components/ArticlesList'
import { fetchArticles } from './api/hackerNewsAPI';

import './style/css/App.css';
import './style/css/style.css'

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')


  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPage(1)
  }

  useEffect(() => {
    // fetchArticles(page, query).then(articles => {
    //   setArticles(articles)
    //   setLoading(false)
    // })
  }, []);



  return (
    <div className="App">
      <Navbar handleSearch={handleSearch} setFilter={setFilter} />
      <div className="hero"></div>
      <ArticlesList page={page} setPage={setPage} articles={articles} filter={filter} />
    </div>
  );

};

export default App;
