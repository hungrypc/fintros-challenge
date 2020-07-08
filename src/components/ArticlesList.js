import React, { useEffect, useState, useRef, useCallback } from 'react'

import Article from './Article';
import { fetchArticles } from '../api/hackerNewsAPI'

function ArticlesList(props) {
  const [articlesList, setArticlesList] = useState([])
  const [loading, setLoading] = useState(true)

  // infinite scrolling
  const observer = useRef()
  const lastArticleRef = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        props.setPage(prevPage => prevPage = prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [props])

  useEffect(() => {
    fetchArticles(props.page, props.query)
      .then(articles => {
        console.log('hi', articles)
        setArticlesList(prevArticles => {
          return [...prevArticles, ...articles]
        })
        setLoading(false)
      })
  }, [props.page, props.filter, props.query])


  // if (articlesList.length < 1) {
  //   return <div>loading</div>
  // } else 
  return (
    <div className="articles-list">
      <div className="articles-list__container">
        {articlesList.map((article, index) => (
          <Article key={article.id} article={article} 
          lastArticleRef={index === (props.page * 30) - 1 ? lastArticleRef : null} 
          />
        ))}
        {/* <div ref={lastArticleRef}>{loading ? 'Loading...' : 'More Articles'}</div> */}
      </div>
    </div>
  )

}

export default ArticlesList
