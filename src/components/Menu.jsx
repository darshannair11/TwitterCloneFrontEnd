import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateIcon from '@mui/icons-material/Create';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Gallery from "./Gallery";

export default function Menu(props){
    return <div className="menu-container">
        <h2>Me<span style={{color:"#1D5D9B",textDecoration:"underline"}}>nu</span></h2>
        <div className="menu-button-container">
        <button onClick={props.changeContentNew} className="menu-button parallelogram"><span><NewReleasesIcon /> Whats New</span></button>
        <button onClick={props.changeContentPop} className="menu-button parallelogram"><span><FavoriteIcon /> Most Popular</span></button>
        <button onClick={props.changeContentMy} disabled={!props.isLoggedIn} className="menu-button parallelogram"><span><ManageAccountsIcon /> My Tweets</span></button>
        <button onClick={props.changeContentCompose} disabled={!props.isLoggedIn} className="menu-button parallelogram"><span><CreateIcon /> Tweet</span></button>
        </div>
        
    </div>
}