import axios from 'axios';


const metaServerURL = 'https://grabity-server.herokuapp.com/'

export const getMeta = async (url) => {
  const metaData = await axios.post(metaServerURL, {
    url
  })
  .catch(err => {
    console.log(err);
  });

  return metaData.data
}