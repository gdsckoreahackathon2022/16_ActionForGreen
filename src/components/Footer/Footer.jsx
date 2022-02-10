import React from "react";
import "./css/index.css";
import logo from "assets/logo.png";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <img src={logo} alt="Logo img" />
        <div className="text">
          <h1>Ⓒ GDSC Hackathon 16 Team</h1>
          <h2>Action for green</h2>
        </div>
      </div>
    </>
  );
};

export default Footer;
