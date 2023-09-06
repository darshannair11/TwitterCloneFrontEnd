import React, { useState } from "react";
import Header from "./Header";
import axios from 'axios';
import Menu from "./Menu";
import Profile from "./Profile";
import Compose from "./Compose";
import Avatar from '@mui/material/Avatar';
import Gallery from "./Gallery";
import BaseUrl from "./BackendUrl";

export default function Home(){
    const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [results, setResults] = React.useState();
  const [user,setUser]=useState();
  const [purpose,setPurpose]=useState("New")
  const [centerContent,setCenterContent]=useState(true);

  function changeContentNew(){
    setPurpose("New");
    setCenterContent(true);
  }

  function changeContentPop(){
    setPurpose("Popular");
    setCenterContent(true)
  }

  function changeContentMy(){
    setPurpose("Mine");
    setCenterContent(true);
  }

  function changeContentCompose(){
    setCenterContent(false);
  }

  React.useEffect(() => {
    axios.get(BaseUrl+"/home",{withCredentials: true,credentials: 'include'})
        .then(res => {
            const data=res.data;
            setIsLoaded(true);
            setResults(data.message);
            setUser(data.user);
        }).catch(err => {
            setIsLoaded(true);
            setError(err);
        })
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>;
} else if (!isLoaded) {
    return <div className="div-loader">
        <h1 className="h1-loader">
      <span class="let1 span-loader">l</span>  
      <span class="let2 span-loader">o</span>  
      <span class="let3 span-loader">a</span>  
      <span class="let4 span-loader">d</span>  
      <span class="let5 span-loader">i</span>  
      <span class="let6 span-loader">n</span>  
      <span class="let7 span-loader">g</span>  
    </h1>
    </div>
    
} else {
  return (
    <div className="home-page">
            {results ? <Header isLoggedIn={true}/> : <Header isLoggedIn={false} />}
            {/* <h1>Home Page</h1>
            <h2>{results ? "Logged in" :"Not Logged in"}</h2> */}
            <Menu isLoggedIn={results} changeContentNew={changeContentNew} changeContentPop={changeContentPop} changeContentMy={changeContentMy} changeContentCompose={changeContentCompose}/>
            <Profile isLoggedIn={results} user={user} avatar={results ? <Avatar sx={{ bgcolor: "#1a4e78"}}>{user.displayName[0].toUpperCase()}</Avatar> : <Avatar src="../assets/any.jpg"></Avatar>}/>
            <div className="right-border-div"></div>
            {centerContent ? <Gallery userId={user ? user.userId : null} isLoggedIn={results} purpose={purpose}/> : (<Compose displayName={user.displayName} avatar={results ? <Avatar sx={{ bgcolor: "#36D1DC"}}>{user.displayName[0].toUpperCase()}</Avatar> : <Avatar src="../assets/any.jpg"></Avatar>}/>)}
            {/* <div style={{height:"200vh"}}></div> */}
        </div>
  );
    }
}