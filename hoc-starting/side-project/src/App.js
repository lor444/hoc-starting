import React, {useState, useEffect} from 'react'
import './App.css'
import { CircularProgress} from '@material-ui/core'



const App = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      fetch( "https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(body => {
          setPosts(body)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
        })
      }, 2000)
  }, [])


  return (
    <>
      { loading ? 
        <CircularProgress /> : 
        <PostList posts={posts} />
      }
     
    </>
  )
}

const PostList = ({posts}) => {
  return (
    <>
      {posts.map(post => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </>
    
  )
}
export default App