import React, { useState, useEffect } from 'react';

import { fetchArticleData } from '../api/hackerNewsAPI';

function Article(props) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  const populateArticleState = async () => {
    await fetchArticleData(props.id)
      .then(res => {
        setArticle(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    populateArticleState()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="article">
        
      </div>
    )
  }
}

export default Article
