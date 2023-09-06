import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";
import axios from "axios";
import CreateIcon from '@mui/icons-material/Create';
import BaseUrl from "./BackendUrl";
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Gallery(props){
    const [galleryConent,setGalleryContent]=useState();

    function newPost(){
        window.scrollTo(0,0);
        setGalleryContent(<div className="gallery-loader"><img src="https://media3.giphy.com/media/v6LmZUEsXHacGsD4UT/200w.webp?cid=ecf05e47dir5oc684ffm7pp7hw9ivv2ifwxgduvfpz7jb1q2&ep=v1_stickers_search&rid=200w.webp&ct=s" alt="not working" /></div>);
        axios.get(BaseUrl+"/newPost",{withCredentials: true,credentials: 'include'})
        .then(function(res){
            var data=res.data;
            var content=data.map(function(post){
                return <>
                    <hr style={{width:"100%"}}/>
                    <Tweet userId={props.userId} isLoggedIn={props.isLoggedIn} postid={post._id}/>
                    
                </>
                    
    
            });
            setGalleryContent(content)
        }).catch(function(err){
            setGalleryContent(<h1>{err.message}</h1>)
        })
    }

    function popularPost(){
        window.scrollTo(0,0);
        setGalleryContent(<div className="gallery-loader"><img src="https://media3.giphy.com/media/v6LmZUEsXHacGsD4UT/200w.webp?cid=ecf05e47dir5oc684ffm7pp7hw9ivv2ifwxgduvfpz7jb1q2&ep=v1_stickers_search&rid=200w.webp&ct=s" alt="not working" /></div>);
        axios.get(BaseUrl+"/popularPost",{withCredentials: true,credentials: 'include'})
        .then(function(res){
            var data=res.data;
            var content=data.map(function(post){
                return <>
                    <hr style={{width:"100%"}}/>
                    <Tweet userId={props.userId} isLoggedIn={props.isLoggedIn} postid={post._id}/>  
                </>
            });
            setGalleryContent(content)
        }).catch(function(err){
            setGalleryContent(<h1>{err.message}</h1>)
        })
    }

    function myPost(){
        window.scrollTo(0,0);
        setGalleryContent(<div className="gallery-loader"><img src="https://media3.giphy.com/media/v6LmZUEsXHacGsD4UT/200w.webp?cid=ecf05e47dir5oc684ffm7pp7hw9ivv2ifwxgduvfpz7jb1q2&ep=v1_stickers_search&rid=200w.webp&ct=s" alt="not working" /></div>);
        axios.get(BaseUrl+"/myPost",{withCredentials: true,credentials: 'include'})
        .then(function(res){
            var data=res.data;
            var content=data.map(function(post){
                return <>
                    <hr style={{width:"100%"}}/>
                    <Tweet userId={props.userId} isLoggedIn={props.isLoggedIn} postid={post._id}/>
                </>
            });
            if(content.length===0){
                setGalleryContent(<div style={{height:"90vh"}}>
                <h4>You have not posted any tweets yet</h4>
                <p>Get started by going to the <CreateIcon />Tweet Page</p>
                </div>);
            }else{
                setGalleryContent(content);
            }
        }).catch(function(err){
            setGalleryContent(<h1>{err.message}</h1>)
        })
    }

    useEffect(() => {
        if(props.purpose==="New"){
            newPost();
        }else if(props.purpose === "Mine"){
            myPost();
        }else if(props.purpose === "Popular"){
            popularPost();
        }
        
    },[props.purpose]);



    return <div className="gallery-container">
        <div className="tweets-container">
            {galleryConent}
        <Alert hidden={props.isLoggedIn} variant={"info"}>
          You will not be able to like a post as you are not logged in
        </Alert>
        </div>
    </div>
}