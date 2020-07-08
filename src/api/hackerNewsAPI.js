import axios from 'axios'

const baseURL = 'https://grabity-server.herokuapp.com'

export const fetchArticles = async (page=1, query='') => {
  // chose beststories because top and new contain jobs (we want articles)
  console.log('called')
  const articles = await axios.post(`${baseURL}/articles`, {
    page,
    query
  }).then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return articles
}

