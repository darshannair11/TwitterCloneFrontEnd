import React, { useState } from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {Outlet, redirect,useNavigate,Link} from "react-router-dom"
import axios from "axios";
import BaseUrl from "./BackendUrl";


export default function Login(props){
    const navigate=useNavigate();
    const [isSignupPage,setPage]=useState(props.signup);
    const [loaderHidden,setHidden]=useState(true);
    const [hideLoginError,setHideLoginErrror]=useState(true);
    const [hideSignupError,setHideSignupError]=useState(true);
    const [missingError,setMissingError]=useState();
    const [form,setForm]=useState({
        username:"",
        password:"",
        displayName:""
    })

    axios.interceptors.response.use(response => {
        return response;
     }, error => {
       if (error.response.status === 401) {
        console.log("Error Caught");
       }
       return error;
     });

    async function checker(){
        axios.get(BaseUrl+"/home",{withCredentials:true})
        .then(function(res){
            console.log(res.data);
        })
    }

    async function signUp(e){
        e.preventDefault();
        setHidden(false);
        console.log("Sign up clicked");
        if(!form.username || !form.displayName || !form.password){
            setMissingError(<p className="error-para">Some of the details are missing</p>);
            setHidden(true);
        }else{
            axios.post(BaseUrl+'/register',form,{withCredentials:true,credentials: 'include'})
        .then(function(response){
            const data=response.data;
            //add a check if it already exists
            if(data.message==="Success"){
                setForm({
                        username:"",
                        password:"",
                        displayName:""
                    });
            setHidden(true); 
            navigate('/',{replace:true});
            }else if(data.message==="Exists"){
                setHidden(true); 
                setHideSignupError(false);
                console.log("Already Exists"); 
            }else{
                console.log("Something went wrong");
            }
        }).catch(function(err){
            setHidden(true);
            setHideLoginErrror(false);
        });
        }
        
    }

    async function logIn(e){
        e.preventDefault();
        setHidden(false);
        console.log("log in clicked");
        axios.post(BaseUrl+'/login',form,{withCredentials:true,credentials: 'include'})
        .then(function(response){
            if (response.status >= 200 && response.status < 300) {
                setForm({
                        username:"",
                        password:"",
                        displayName:""
                    });
                setHidden(true); 
                navigate('/',{replace:true});
            }else{
                setHidden(true);
                setHideLoginErrror(false)
            }   
        })
        // fetch('http://localhost:8000/login', {
        //     method: 'POST',
        //     body: JSON.stringify(form),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(response => {
        //     if (response.status >= 200 && response.status < 300) {
        //         response.json().then((data) => {
        //             setForm({
        //                 username:"",
        //                 password:"",
        //                 displayName:""
        //             });
        //             setHidden(true);
        //             if(data.message){
        //                 console.log(data.message);
        //                 console.log("Yes I am authenticated");
        //                 // navigate('/',{replace:true});
        //             }
        //         },(err) => {
                    
        //         })
        //       } else {
        //        console.log('Somthing happened wrong');
        //       }
        // })
    }

    function handleChange(e){
        var name=e.target.name;
        var value=e.target.value;
        setForm((prevForm) => {
            return {...prevForm,[name]:value}
        }) 
    }

    return <div id="signin-body">
        <main className="form-signin w-100 m-auto">
            <div className="form-body">
                <div className="button-container">
                    <ButtonGroup size="lg" className="mb-2" style={{border:"none"}}>
        <Button onClick={() => {setPage(false);}} className="button-signin">Log In</Button>
        <Button onClick={() => {setPage(true);}} className="button-signup">Sign Up</Button>
      </ButtonGroup>
                </div>
        <form>
      <TwitterIcon style={{height:"57",width:"72"}} />
      <h1 className="h3 mb-3 fw-normal">{isSignupPage ? "Sign up for your free account":"Log into your account"}</h1>
        <p hidden={hideLoginError} className="error-para">Invalid username or password, Please try again</p>
        <p hidden={hideSignupError} className="error-para">There is already a account associated with this email</p>
      <div className="form-floating">
        <input  onChange={handleChange} name="username" type="text" className="form-control" id="floatingInput" placeholder="name@example" value={form.username}/>
        <label htmlFor="floatingInput">Username</label>
      </div>
      <div className="form-floating" hidden={!isSignupPage}>
        <input onChange={handleChange} name="displayName" type="text" className="form-control" id="floatingInput" placeholder="user@123" value={form.displayName}/>
        <label htmlFor="floatingInput">Display Name</label>
      </div>
      <div className="form-floating">
        <input onChange={handleChange} name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" value={form.password}/>
        <label htmlFor="floatingPassword">Password</label>
      </div>
      {missingError}
      <div className="loader-container">
    <div hidden={loaderHidden} className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
    </div>
      <button onClick={(isSignupPage ? signUp : logIn)} style={isSignupPage ? {backgroundColor:"#1a4e78"} : {}} className="btn btn-primary w-100 py-2 button-submit" type="submit">{isSignupPage ? "Sign up" : "Log in with these credentials"}</button>
      <p className="mt-5 mb-3 text-body-secondary">© Tweet It 2023</p>
      
    </form>
     <Link to={"/"}><button className="backtohome-button" onClick={checker} >Back to Home</button></Link>
    </div>
    
  </main>
  <Outlet />
    </div>
    
}