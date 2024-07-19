import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { format } from "timeago.js"

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [user, setUser] = useState({});
  const [filePath, setFilePath] = useState("");
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser.id));
  }, [post.likes, currentUser.id]);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/profile/${post.user_id}`, {
        headers: {
          "Authorization": `Bearer ${currentUser.access_token}`
        }
      });
      setUser(res.data)
    }
    getUser();
  }, [post.user_id, currentUser]);



  const handleLike = async () => {
    try {
      if (isLiked) {
        await axios.put(`/like/${post._id}`, {}, {
          headers: {
            "Authorization": `Bearer ${currentUser.access_token}`,
          }
        });
        setLike(like - 1);
        setIsLiked(false)
      } else {
        setLike(like + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error(`Falied to upadate likes ${error}`);
    }
  }
  const handleDownload = async () => {
    try {
      const res = await axios.get(`/post/${post._id}`, {
        headers: {
          "Authorization": `Bearer ${currentUser.access_token}`
        }
      });
      console.log(res.data.post.book_file);
      if (res.data && res.data.post.book_file) {
        const fileUrl = `${window.location.origin}/${res.data.post.book_file}`;
        setFilePath(fileUrl);

        const link = document.createElement('a');
        link.href = filePath;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setFilePath('');
      }
    } catch (error) {
      console.error(`Error downloading the file ${error}`);
    }
  };
  const commentCount = post.comments ? Object.keys(post.comments).length : 0;
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={user.profile_picture ? user.profile_picture : "/assets/images/profile.jpg"} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.username}</span>
              </Link>
              <span className="date">{format(post.created_at)}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.details}</p>
          <img src={post.book_img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={handleLike}>
            {isLiked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {like}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentCount}
          </div>
          { post.book_file && (
          <div className="item" onClick={handleDownload}>
            <DownloadOutlinedIcon />
            Download
          </div>
          )}
        </div>
        {commentOpen && <Comments post={post} />}
      </div>
    </div>
  );
};

export default Post;