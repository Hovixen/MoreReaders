import { useContext, useEffect, useState } from "react";
import "./comments.scss";
import SendIcon from "@mui/icons-material/Send"
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { format } from "timeago.js";

const Comments = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [postComment, setPostComment] = useState({
    comment: '',
    userId: currentUser.id,
    username: currentUser.username,
    userPic: currentUser.profilePic,
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${post._id}`, {
          headers: {
            "Authorization": `Bearer ${currentUser.access_token}`
          }
        });
        setComments(res.data);
      } catch (error) {
        console.error(`Error fetching comment ${error}`);
      }
    };
    fetchComments();
  }, [post._id, currentUser]);

  const submitComment = async (event) => {
    event.preventDefault();
    if (!postComment.comment.trim()) {
      return;
    }
    try {
      const res = await axios.post(`/comments/${post._id}`, {
        "userId": postComment.userId,
        "comment": postComment.comment,
        "userPic": postComment.userPic,
        "username": postComment.username,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentUser.access_token}`
        }
      });
      setComments({
        ...comments,
        [res.data.comment.comment_id]: res.data.comment
      });
      console.log(res.data);

    } catch (error) {
      console.error(`Error posting comments ${error}`);
    }
    setPostComment({
      comment: '',
      userId: currentUser.id,
    })
  }

  const handleComment = (event) => {
    const { name, value } = event.target;
    setPostComment({
      ...postComment,
      [name]: value
    });
  };

  return (
    <div className="comments">
      <form onSubmit={submitComment} className="write">
        <img src={currentUser.profilePic ? `${PF}${currentUser.profilePic}`  : "/assets/images/profile.jpg"} alt="" />
        <input
          type="text"
          name="comment"
          value={postComment.comment}
          onChange={handleComment}
          placeholder="write a comment" />
        <button type="submit" disabled={!postComment.comment.trim()}>
          <SendIcon />
        </button>
      </form>
      {Object.keys(comments).map((commentId) => (
        <div key={commentId} className="comment">
          <img src={comments[commentId].userPic ? 
            `${PF}${comments[commentId].userPic}` :
            "/assets/images/profile.jpg" } alt=""
          />
          <div className="info">
            <span>{comments[commentId].username}</span>
            <p>{comments[commentId].comment}</p>
          </div>
          <span className="date">{format(comments[commentId].created_at)}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;