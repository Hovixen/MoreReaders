import "./sidebar.scss";
import BookShelves from "../../components/BookShelves/shelflist";
import { Link } from "react-router-dom"; 
import { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { AuthContext } from "../../context/authContext";

const SideBar = () => {

  const { currentUser } = useContext(AuthContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToshow: 3,
    slidesToScroll: 1
  };

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
            <ContactsOutlinedIcon />
            <span>Friends</span>
          </div>
          <div className="item" >
          <Link to='book' style={{ textDecoration: "none", color: "inherit" }}>
            <BookOutlinedIcon />
          </Link>
          <Link to='book' style={{ textDecoration: "none", color: "inherit" }}>
            <span>Library</span>
          </Link>
          </div>
          <div className="item">
            <GroupOutlinedIcon />
            <span>Readingbuddies</span>
          </div>
          <div className="item">
            <EventOutlinedIcon />
            <span>Events</span>
          </div>
          <div className="item">
            <MessageOutlinedIcon />
            <span>Messages</span>
            
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>You Might Like</span>
          <Slider {...settings}>
             <BookShelves />
          </Slider>       
        </div>
        </div>
    </div>
  );
};

export default SideBar;