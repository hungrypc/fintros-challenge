import React, { useState, useEffect } from 'react';

import Article from './components/Article';
import { fetchArticles } from './api/hackerNewsAPI.js';


import './style/css/App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)

  // returns number of articles per page
  const paginate = () => {
    const numOfArticles = page * 30;
    return articles.slice(0, numOfArticles)
  }

  useEffect(() => {
    fetchArticles().then(articleIds => {
      setArticles(articleIds)
      setLoading(false)
    })
  }, []);

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="App">
        {paginate().map(article => (
          <Article key={article} id={article}/>
        ))}
      </div>
    );
  }
};

export default App;
