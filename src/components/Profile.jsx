import React, { useEffect, useState } from "react";
import ScrollButton from "./ScrollButton";

export default function Profile(props){
    return <div className="right-container">
    <div className="profile-container">
        <h2><span className="avatar-svg">{props.avatar}</span> User Profile</h2>
        <br />
        {
            props.isLoggedIn ? <div><p><span>Username: </span><br /> {props.user.username}</p>
        <p><span>Display Name: </span><br /> {props.user.displayName}</p>
        <p><span>Date of Join: </span><br /> {props.user.dateofJoin}</p>
        <p><span>My Tweets: </span><br /> {props.user.no_tweets}</p></div> : <p>Not Logged in</p>
        }
        
    </div>
    <ScrollButton />
    </div>
}