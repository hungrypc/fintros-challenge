import { useEffect, useState }from 'react'
import { fetchArticles } from '../api/hackerNewsAPI'

function useArticleSearch(query = '', page = 1) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [articles, setArticles] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetchArticles().then(articles => {
      console.log(articles)
      setArticles()
    })
  }, [])

  return 
}

export default useArticleSearch
