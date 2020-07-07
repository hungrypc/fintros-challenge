import React, { useState, useEffect } from 'react';

import Article from './components/Article';
import { fetchArticles } from './api/hackerNewsAPI.js';


import './style/css/App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)

  // might be better way to do this
  const populateAppState = async () => {
    await fetchArticles()  
      .then(res => {
        setArticles(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  };

  // returns number of articles per page
  const paginate = () => {
    const numOfArticles = page * 30;
    return articles.slice(0, numOfArticles)
  }

  useEffect(() => {
    populateAppState()
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
