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
  

  console.log(meta)

  

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="article">   
        <div></div>
      </div>
    )
  }
}

export default Article
