## Technical Challenge for Fintros

[Demo](https://shielded-lake-75197.herokuapp.com/)

Displays 'best stories' from Hacker News on a clean, minimalistic page. 

- Articles retrieved from a [simple server I quickly hacked together](https://github.com/hungrypc/grabity-server) (to get by cors block for metadata) that fetches from the [Hacker News API](https://github.com/HackerNews/API)
- Shows title, description, meta-data image per article. 
- Infinite scrolling, loading 30 articles per page. 
- Responsive design
- Filter buttons by odd/even numbered articles
- Local title search, displays LOADED articles on page that includes query in title
- Title search, queries server to retrieve all articles from best stories that includes query in title
- Dark mode toggle available