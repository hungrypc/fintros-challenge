import axios from 'axios'

const baseURL = 'https://hacker-news.firebaseio.com/v0'

export const fetchArticles = () => {
  // chose beststories because top and new contain jobs (we want articles)
  return axios.get(`${baseURL}/beststories.json`)  
}


// fetching data per article instead of returning compiled object of all article data
// so that articles are loaded per page AND in case one article errors
export const fetchArticleData = (id) => {
  return axios.get(`${baseURL}/item/${id}.json`)
}

