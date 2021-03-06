import React, { useState, useEffect } from 'react';

import { getMeta } from '../utility/getMeta'

function Article(props) {
  const [loading, setLoading] = useState(true)
  const [meta, setMeta] = useState({})

  const checkLocalQuery = () => {
    return props.article.title.toLowerCase().includes(props.localQuery)
  }

  useEffect(() => {
    let mounted  = true
    if (checkLocalQuery()) {
      getMeta(props.article.url).then(res => {
        if (mounted) {
          setMeta(res)
          setLoading(false)
        }
      })
    }
    return () => {
      mounted = false
    }
  }, [props.localQuery, props.article.url])


  if (loading && checkLocalQuery()) {
    return <div className="article-loading">Loading...</div>
  } else {
    if (checkLocalQuery()) {
      return (
        <div className="article" ref={props.lastArticleRef}>          
          <div className="article__title"> 
            <div className="article__title--index">
              <div>
                {props.index}.
              </div>
            </div>
            <div className="article__title--header">
              {props.article.title}
            </div>
          </div>
          <div className="article__description">
            <div className="article__description--image">
              {meta.image ? <img src={meta.image} alt="preview" /> : <div className="no-image"></div> }
            </div>
            <div className="article__description--content">
              <div>
                {meta.description ? meta.description : null}
              </div>
              <div className="article__description--content-link">
                <a href={props.article.url}>More... </a>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Article
