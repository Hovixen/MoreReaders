import "./sidebar.scss";
import Friends from "../../assets/friend.png";
import Readingbuddies from "../../assets/room.png";
import Library from "../../assets/library.png";
import Events from "../../assets/event.png";
import Messages from "../../assets/chat.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const SideBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="sideBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Library} alt="" />
            <span>Library</span>
          </div>
          <div className="item">
            <img src={Readingbuddies} alt="" />
            <span>Readingbuddies</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default SideBar;