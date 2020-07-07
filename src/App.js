import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar'
// import Article from './components/Article';
import ArticlesList from './components/ArticlesList'
import { fetchArticles } from './api/hackerNewsAPI';

import './style/css/App.css';

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
        <ArticlesList page={page} setPage={setPage} articles={articles} />
      </div>
    );
  }
};

export default App;
