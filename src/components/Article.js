import React, { useState, useEffect } from 'react';

import { fetchArticleData } from '../api/hackerNewsAPI';

function Article(props) {
  const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticleData(props.id).then(res => {
      setArticle(res)
      setLoading(false)
    })
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
