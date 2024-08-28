import React from "react";
import "./friends.scss";
import FriendList from "../FriendList/FriendList";


const Friends = () => {
    return (
        <div className="FriendContainer">
            <FriendList online={true} />
            <FriendList />
            <FriendList online={true} />
            <FriendList />
            <FriendList online={true} />
            <FriendList />
            <FriendList />
        </div>

    )
};

export default Friends

