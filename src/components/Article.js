import React, { useState, useEffect } from 'react';

import { fetchArticleData } from '../api/hackerNewsAPI';
import { getMeta } from '../utility/getMeta'

function Article(props) {
  const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticleData(props.id).then(res => {
      setArticle(res)
      setLoading(false)
    })
  }, [])
  

  // console.log(article.url)
  if(article.url) {
    const meta = getMeta(article.url)
    console.log(meta)
  }

  

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="article">
        {/* <img src={getMeta(article.url).} */}
        <div></div>
      </div>
    )
  }
}

export default Article
