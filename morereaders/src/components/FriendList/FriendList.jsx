import React, { useContext, useState } from "react";
import "./friendlist.scss";
import profilePic from "../../assets/profile_pic.png";
import { SendRounded } from "@mui/icons-material";
import api from "../../api";
import { AuthContext } from "../../context/authContext";


const FriendList = ({ online }) => {
    const { currentUser } = useContext(AuthContext);

    return (

        <div className="FriendCard">
            <div className="FriendWrap">
                <img src={profilePic} alt="" className="FriendImg" />
                <span className={online ? "OnlineStatus" : "OfflineStatus"}></span>
                <div className="FriendInfo">
                    <span className="FriendName">John Doe</span>
                    <button className="Message">
                        <SendRounded />
                        <span className="MessageText">Message</span>
                    </button>
                </div>
            </div>
        </div>

    )
};

export default FriendList
