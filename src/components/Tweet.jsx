import React, { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import Skeleton from '@mui/material/Skeleton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CircularProgress from '@mui/material/CircularProgress';
import BaseUrl from "./BackendUrl";

export default function Tweet(props){
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [post, setPost] = React.useState();
    const [liked,setLiked]=React.useState();
    const [plusOne,setOne]=React.useState(0);
    const [likePostCalled,setlikePostCalled]=React.useState(false);
    const [unlikePostCalled,setunlikePostCalled]=React.useState(false);
    const [functionCalled,setFunctionCalled]=React.useState(false);
    const [postLikes,setPostLikes]=React.useState();
    const [deleteLoader,setDeleteLoader]=React.useState(false);

    function likePost(){
        setFunctionCalled(true);
        setLiked(true);
        setPostLikes((prev) => {
            return prev+1;
        });
        axios.post(BaseUrl+"/likePost",{id:props.postid},{withCredentials: true,credentials: 'include'})
        .then(res => {
            console.log(res.data.message);
            setlikePostCalled(true);
            setFunctionCalled(false);
        })
        
    }

    function unlikePost(){
        setFunctionCalled(true);
        setLiked(false);
        setPostLikes((prev) => {
            return prev-1;
        })
        axios.post(BaseUrl+"/unlikePost",{id:props.postid},{withCredentials: true,credentials: 'include'})
        .then(res => {
            console.log(res.data.message);
            setunlikePostCalled(true);
            setFunctionCalled(false)
        })
        
    }

    function deletePost(){
        setDeleteLoader(true);
        axios.post(BaseUrl+"/deletePost",{id:props.postid},{withCredentials: true,credentials: 'include'})
        .then(res => {
            console.log(res.data.message);
            setDeleteLoader(false);
            window.location.reload();
        })
    }

    React.useEffect(() => {
        axios.post(BaseUrl+"/getPost",{id:props.postid},{withCredentials: true,credentials: 'include'})
            .then(res => {
                const data=res.data;
                setPost(data);
                setLiked(data.liked);
                setPostLikes(Number(data.likes));
                setIsLoaded(true);
            }).catch(err => {
                setIsLoaded(true);
                setError(err);
            })
      }, [])
      if (error) {
        return <div>Error: {error.message}</div>;
      }else if(!isLoaded){
        return <div className="tweet-div">
            <h4 className="tweet-display"><span className="tweet-icon">{<Skeleton variant="circular" width={55} height={55} />}</span> {<div style={{display:"inline-block"}}><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></div> }</h4>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="rectangular" width={"90%"} height={400} />
        </div>        
      }
      else{
        return  <div className="tweet-div">
            <h4 className="tweet-display"><span className="tweet-icon"><Avatar sx={{width:55,height:55,bgcolor: "#36D1DC",zIndex:"0"}}>{post ? post.displayName[0].toUpperCase() : null}</Avatar></span> {post.displayName}<button onClick={deletePost} style={{display:((props.userId === post.owner || props.userId === "64c8b457b03af54559c3cd2c") ? "inline-block" : "none"),marginLeft:"20px"}}><DeleteOutlineIcon fontSize="large"/><CircularProgress disableShrink sx={deleteLoader ? {verticalAlign:"middle"} :{display:"none"}} size={30}/></button></h4>
            <p className="tweet-user">{post.username} tweeted on {post.date}</p>
            <p className="tweet-content">{post.content}</p>
            {post.imageLink ? <div className="tweet-img"><img src={post.imageLink} alt="" /></div> : null}
            <div className="tweet-bar"><button disabled={!props.isLoggedIn || functionCalled} onClick={liked ? unlikePost : likePost}>{liked ? <FavoriteIcon sx={{fontSize:40,color:"#e31b23"}}/> : <FavoriteBorderIcon sx={{fontSize:40,color:"#e31b23"}}/>}</button> {postLikes}</div>
        </div>
// }
}
}