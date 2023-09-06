import React from "react";
import {BrowserRouter,Link,Route,Routes} from "react-router-dom"
import Home from "./Home";
import Login from "./Login";
import Compose from "./Compose";

export default function Router(){
    return <BrowserRouter forceRefresh={false}>
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/login" element={<Login signup={false}/>} />
            <Route path="/signup" element={<Login signup={true}/>}/>
            <Route path="/compose"  element={<Compose />}/>
        </Routes>
    </BrowserRouter>
}