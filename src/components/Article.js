import React, { useState, useEffect } from 'react';

import { fetchArticleData } from '../api/hackerNewsAPI';
import { getMeta } from '../utility/getMeta'

function Article(props) {
  const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true)
  const [meta, setMeta] = useState({})

  useEffect(() => {
    // fetchArticleData(props.id).then(res => {
      console.log(props.article)
      // setArticle(props.article)
      getMeta(props.article.url).then(res => {
        setMeta(res)
        setLoading(false)
      })
    // })
  }, [])


  if (loading) {
    return <div className="article">Loading...</div>
  } else {
    return (
      <div className="article" ref={props.lastArticleRef}>
        {/* <img src={meta.image} alt="preview" /> */}
        <div className="article__title">{props.article.title}</div>
        <div className="article__description">{meta.description ? meta.description : null}</div>
      </div>
    )
  }
}

export default Article
