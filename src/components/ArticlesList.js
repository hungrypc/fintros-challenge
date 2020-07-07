import React, { useEffect, useState, useRef, useCallback } from 'react'

import Article from './Article';

function ArticlesList(props) {
  const [filteredArticles, setFilteredArticles] = useState([])
  const [loading, setLoading] = useState(true)
  // const [page, setPage] = useState(1)

  const observer = useRef()
  const lastArticleRef = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log('visible')
        props.setPage(prevPage => prevPage = prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [props])


  useEffect(() => {
    // returns number of articles per page
    const paginate = (articlesList) => {
      const numOfArticles = props.page * 30;
      return articlesList.slice(0, numOfArticles)
    }

    setFilteredArticles(paginate(props.articles))

  }, [props.page])

  if (filteredArticles.length < 1) { 
    return <div>loading</div>
  } else {
    return (
      <div>
        {filteredArticles.map((article, index) => (
          <Article key={article} id={article} lastArticleRef={index === (props.page * 30) - 1 ? lastArticleRef : null} />
        ))}
      </div>
    )
  }
}

export default ArticlesList
