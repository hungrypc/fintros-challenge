import axios from 'axios'

const baseURL = 'https://hacker-news.firebaseio.com/v0'

export const fetchArticles = async () => {
  // chose beststories because top and new contain jobs (we want articles)
  const articleIds = await axios.get(`${baseURL}/beststories.json`)
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })
  return articleIds
}


// fetching data per article instead of returning compiled object of all article data
// so that articles are loaded per page AND in case one article errors
export const fetchArticleData = async (id) => {
  const articleData = await axios.get(`${baseURL}/item/${id}.json`)
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })
  return articleData
}

