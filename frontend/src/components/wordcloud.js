import axios from 'axios'
import React from 'react'
import ReactWordcloud from "react-wordcloud"

function Wordcloud(props) {
  const [post, setPost] = React.useState(null)
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

  const wordData = post[0].map((label, index) => ({
    text: label,
    value: 20 - index
  }))

  return (
    <ReactWordcloud words={wordData} />
  );
}

export default Wordcloud;
