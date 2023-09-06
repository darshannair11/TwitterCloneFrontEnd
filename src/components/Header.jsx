import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link,Outlet,useNavigate} from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import axios from "axios";
import BaseUrl from "./BackendUrl";

export default function Header(props){
    const navigate=useNavigate();
    console.log(props.isLoggedIn);
    const navUsual=(<Nav>
        <Nav.Link className="secondary-color home-login" href="/login">Log In</Nav.Link>
        <Nav.Link className="secondary-color home-login" href="/signup">Sign Up</Nav.Link> 
    </Nav>);
    const navLoggedIn=(<Nav>
        <Nav.Link onClick={logOut} className="secondary-color home-login">Log Out</Nav.Link>
    </Nav>);

    async function logOut(){
        axios.get(BaseUrl+"/logout",{withCredentials: true,credentials: 'include'})
        .then(res => {
            const data=res.data;
            if(data.message==="Success"){
                console.log("Worked");
                return window.location.reload(true);
            }else{
                console.log("Something went worng");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (<>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar-deco">
    <Container>
      <Link className="link-tag" to={""} refresh={"true"}><Navbar.Brand style={{fontSize:"1.4rem"}} className="secondary-color"><TwitterIcon id="twitter-icon"/> Tweet It</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link className="secondary-color">Description</Nav.Link>
          <Nav.Link className="secondary-color">GitHub</Nav.Link>
        </Nav>
        {props.isLoggedIn ? navLoggedIn : navUsual}
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Outlet />
    </>);
}
