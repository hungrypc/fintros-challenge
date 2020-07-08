import React, { useState, useEffect } from 'react';

import { getMeta } from '../utility/getMeta'

function Article(props) {
  const [loading, setLoading] = useState(true)
  const [meta, setMeta] = useState({})

  useEffect(() => {
    getMeta(props.article.url).then(res => {
      setMeta(res)
      setLoading(false)
    })
  }, [props.localQuery])


  if (loading) {
    return <div className="article">Loading...</div>
  } else {
    if (props.article.title.toLowerCase().includes(props.localQuery)) {
      return (
        <div className="article" ref={props.lastArticleRef}>
          {/* <img src={meta.image} alt="preview" /> */}
          <div className="article__title">{props.index}. {props.article.title}</div>
          <div className="article__description">{meta.description ? meta.description : null}</div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Article
