import axios from 'axios';


const metaServerURL = 'https://grabity-server.herokuapp.com/meta'

export const getMeta = async (url) => {
  const metaData = await axios.post(metaServerURL, {
    url
  })
  .catch(err => {
    console.log(err);
  });

  if (metaData){ 
    return metaData.data
  } else {
    // handle no metaData
    return {
      description: '',
      image: ''
    }
  } 
}