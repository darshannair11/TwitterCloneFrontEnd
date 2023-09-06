import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from "axios";
import {storage} from "../firebase";
import {ref,uploadBytes,listAll,getDownloadURL} from "firebase/storage"
import {v4} from 'uuid';
import BackendUrl from "./BackendUrl";

export default function Compose(props){
    const [tweet,setTweet]=useState("");
    const [limitError,setLimitError]=useState(false);
    const [loaderHidden,setloaderHidden]=useState(true);
    const [imageUpload,setImageUpload]=useState(null);

    function addPost(e){
        e.preventDefault();
        setloaderHidden(false);
        if(imageUpload === null){
            var url="";
            console.log(url)
            postData(url)
            
        }else{
            const imageRef=ref(storage,'images/'+(imageUpload.name + v4()));
            uploadBytes(imageRef,imageUpload).then(function(snapshot){
                getDownloadURL(snapshot.ref).then(function(url){
                    var url=url;
                    console.log(url);
                    postData(url)
                })               
            })
        }
    }
        

    function postData(url){
        console.log(props.displayName)
        var data={
            displayName:props.displayName,
            content:tweet,
            imageLink:url
        }
        axios.post(BackendUrl+'/postTweet',data,{withCredentials:true})
        .then(function(response){
            if (response.status >= 200 && response.status < 300) {
                console.log(response.data);
                if(response.data.message==="Success"){
                    setTweet("");
                    setImageUpload(null);
                    setloaderHidden(true);
                    return window.location.reload();
                }else{
                    console.log("Unauthorized Access");
                }
            }else{
                setloaderHidden(true);
                console.log("Something went wrong")
            }   
        }) 
    }

    function handleChange(e){
        if(e.target.value.length <250){
            setTweet(e.target.value);
            setLimitError(false);
        }else if(e.target.value.length === 250){
            setTweet(e.target.value);
            setLimitError(true);
        }
    }

    return <div className="compose-container">
        {window.scrollTo(0,0)}
    <div className="compose-form">
    <h2><span className="avatar-svg">{props.avatar}</span> Something on your mind?</h2>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <TextField
          id="filled-multiline-static"
          label="Write a Tweet"
          multiline
          rows={4}
          variant="filled"
          style={{width:"90%"}}
          value={tweet}
          onChange={handleChange}
        />
    <p style={{marginLeft:"10px",fontSize:"0.8rem"}}>You have {250-tweet.length} characters left</p>
    <p className="error-para" hidden={!limitError} style={{marginLeft:"10px",fontSize:"0.8rem"}}>Limit Reached</p> 
    </Box>
    <div className="form-buttons">
        <input  onChange={(e) => {setImageUpload(e.target.files[0])}} className="img-input" type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />
        <div className="space-div"></div>
    <button onClick={addPost} className="post-button"><span>Post <AddBoxIcon /></span></button>
    </div>
    <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
        <div hidden={loaderHidden} className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
    </div>
    </div>
    
    
        </div>
}