import Post from "../post/Post";
import "./posts.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
// import CreatePost from "../createPost/CreatePost";

const Posts = ({ user }) => {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  //console.log(user.username);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        let res;
        let sortedPosts;

        if (user && user.username) {
          res = await axios.get(`/posts/${user.username}`, {
            headers: {
              "Authorization": `Bearer ${currentUser.access_token}`
            }
          });
          console.log(res.data);
          sortedPosts = res.data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else {
          res = await axios.get('/timeline', {
            headers: {
              "Content-Type": "application/Json",
              "Authorization": `Bearer ${currentUser.access_token}`,
            }
          });
          sortedPosts = res.data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
        setPost(sortedPosts);
        console.log(res.data);
      } catch (error) {
        console.error(`Error fetching post ${error}`)
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [currentUser, user]);

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