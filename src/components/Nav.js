import React, { useEffect, useState } from "react";
import "./Nav.css";

const Nav = () => {
    const [show,handleShow]=useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100)
            {
                handleShow(true);
            }
            else
            handleShow(false);
        });
        return ()=>{
            window.removeEventListener("scroll");
        }
    },[]);
  return (
    <div className={`nav ${show&&"nav_black"}`}>
      <img className="nav_logo"
      src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix"></img>
      <img className="nav_logo" src="https://lh3.googleusercontent.com/proxy/WT0EULUuyKgvoWHpAE7rVyllhZ0PN8yN21cx69_1wP60p2Vgi4zSSBo2OPCrHD9JxAJay_P0V2TmDec0JhmKp4Dda8oQhXu4AG03CN7WCq5-yv-rnmDuFcu8fF3B" alt="Profile">
      </img>
      {/* <h4>hellooo</h4> */}
    </div>
  );
};

export default Nav;
