import axios from 'axios'
import React from 'react'
import ReactWordcloud from 'react-wordcloud'
import Button from 'react-bootstrap/Button'

function Wordcloud(props) {
  const [post, setPost] = React.useState(null)
  const [cloudID, setCloudID] = React.useState(0)
  React.useEffect(() => {
    axios.get(props.url, {
      auth: {
        username: 'group20',
        password: 'group202023'
      }
    }).then((response) => {
      setPost(response.data);
    });
  }, [props]);

  if (!post) return <div>Failed to load CouchDB</div>
  console.log(post)

  function updateCloudID() {
    setCloudID(cloudID == 4 ? 0: cloudID + 1);
  }

  function getWordData() {
    return post[cloudID].map((label, index) => ({
      text: label,
      value: 20 - index
    }))
  }

  return (
    <div>
      <Button variant="primary" size="lg" onClick={updateCloudID}>
        Current Topic: {cloudID + 1}
      </Button>
      <ReactWordcloud words={getWordData()} />
    </div>
  );
}

export default Wordcloud;
