import "./sidebar.scss";
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
import quick from "../../assets/quick.jpeg";
import tarzan from "../../assets/tarzan.jpeg";
import gilded from "../../assets/gilded.jpeg";
import magic from "../../assets/magic.jpeg";
import look from "../../assets/look.jpeg";
import { AuthContext } from "../../context/authContext";

const SideBar = () => {

  const { currentUser } = useContext(AuthContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
          <Link to='Library' style={{ textDecoration: "none", color: "inherit" }}>
            <BookOutlinedIcon />
          </Link>
          <Link to='Library' style={{ textDecoration: "none", color: "inherit" }}>
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
          <span class="suggestion">You Might Like</span>
          <Slider {...settings}>
             {data.map((d) => (
              <div key={d.name}>
                <div className="h-56"> 
                  <img src={d.img} alt=""/>
                </div>
              </div>
             ))}
          </Slider>       
        </div>
      </div>
    </div>
  );
}

const data = [

  {
    name: "Don't Look",
    img: look
  },

  {
    name: "Quicksand",
    img: quick
  },

  {
    name: "Gilded",
    img: gilded
  },

  {
    name: "Magic",
    img: magic
  },

  {
    name: "Tarzan",
    img: tarzan
  },

];

export default SideBar;