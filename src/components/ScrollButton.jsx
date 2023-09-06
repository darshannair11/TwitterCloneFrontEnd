import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function ScrollButton(){
    const [showButton,setShowButton]=useState(false);

    useEffect(() => {
        const handleScrollVisibility=() => {
            window.scrollY >50 ? setShowButton(true) : setShowButton(false);
        }
        window.addEventListener('scroll',handleScrollVisibility);

        return ()=>{
            window.removeEventListener('scroll',handleScrollVisibility);
        }
    },[]);

    function scrollToTop(){
        window.scrollTo({top:0,behavior:"smooth"});
    }

    return <div className="backtotop-container">
    {/* <button hidden={!showButton} onClick={scrollToTop} className="backtotop-button">Back to top</button> */}
    <Button hidden={!showButton} startIcon={<ArrowUpwardIcon />} size="large" className="backtotop-button" onClick={scrollToTop}>Back to Top</Button>
</div>
}