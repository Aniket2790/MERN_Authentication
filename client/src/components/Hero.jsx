import React, { useContext } from "react";
import "../styles/Hero.css";
import heroImage from "../assets/img1.png";
import { Context } from "../main";

const Hero = () => {
  const { user } = useContext(Context);
  return (
    <>
      <div className="hero-section">
        <img src={heroImage} alt="hero-image" />
        <h4>Hello, {user ? user.name : "Developer"}</h4>
        <h1>Welcome to MERN Auth Application</h1>
        <p>
          I developed a complete MERN Authentication System that includes email
          verification using Nodemailer and phone number verification using
          Twilio, ensuring secure and reliable user onboarding.
        </p>
      </div>
    </>
  );
};

export default Hero;
