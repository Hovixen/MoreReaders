import Post from "../post/Post";
import magic from "../../assets/magic.jpeg";
import quick from "../../assets/quick.jpeg";
import "./posts.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
// import CreatePost from "../createPost/CreatePost";

const Posts = () => {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get('/post', {
          headers: {
            "Content-Type": "application/Json",
            "Authorization": `Bearer ${currentUser.access_token}`,
          }
        });
        const sortedPosts = res.data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setPost(sortedPosts);
        console.log(res.data);
      } catch (error) {
        console.error(`Error fetching post ${error}`)
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [currentUser]);
  
//  const newPost = (addPost) => {
//    setPost((prevPost) => [addPost, ...prevPost])
//  }
  return (
    <div className="posts">
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        Array.isArray(posts) && posts.map(post => (
          <Post post={post} key={post._id} />
        ))
      )};
    </div>
  );
};

export default Posts;