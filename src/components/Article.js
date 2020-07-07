import React, { useState, useEffect } from 'react';

import { fetchArticleData } from '../api/hackerNewsAPI';
import { getMeta } from '../utility/getMeta'

function Article(props) {
  const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true)
  const [meta, setMeta] = useState({})

  useEffect(() => {
    fetchArticleData(props.id).then(res => {
      setArticle(res)
      getMeta(res.url).then(res => {
        setMeta(res)
        setLoading(false)
      })
    })
  }, [])


  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="article">
        {/* <img src={meta.image} alt="preview" /> */}
        <div className="article__title">{article.title}</div>
        <div className="article__description">{meta.description}</div>
      </div>
    )
  }
}

export default Article
