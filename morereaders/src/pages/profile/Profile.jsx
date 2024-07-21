import "./profileimage.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const { identifier } = useParams();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let res;
        if (identifier.match(/^[0-9a-fA-f]{24}$/)) {
          // if it matches an ObjectId
          res = await axios.get(`/profile?user_id=${identifier}`, {
            headers: {
              "Authorization": `Bearer ${currentUser.access_token}`
            }
          });
        } else {
          res = await axios.get(`/profile?username=${identifier}`, {
            headers: {
              "Authorization": `Bearer ${currentUser.access_token}`
            }
          });
        }
        setUser(res.data);
      } catch(error) {
        console.error(`Error fetching user ${error}`)
      }
    };
    fetchUser()
  },[identifier, currentUser.access_token]);
  return (
    <div className="profile">
      <div className="images">
        <img
          src={user.coverImg || "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
          alt=""
          className="cover"
        />
        <img
          src={user.profile_picture || "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{user.first_name} {user.last_name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>Nigeria</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{user.username}</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <MoreVertIcon />
          </div>
        </div>
      <Posts user={user}/>
      </div>
    </div>
  );
};

export default Profile;