import React from "react";
import "../styles/Instructor.css";
import instructorImage from "../assets/profile.jpg";

const Instructor = () => {
  return (
    <div className="instructor-page">
      <div className="instructor-card">
        <div className="instructor-image">
          <img src={instructorImage} alt="Instructor" />
        </div>
        <div className="instructor-info">
          <h1>Aniket Tiwari</h1>
          <h4>Your Developer</h4>
          <p>
            Hello! i'm Aniket Tiwari , a passionate MERN stack developer with a
            love for building scalable, robust applications. With years of
            experience in JavaScript, React, Node.js, Express, and MongoDB, I am
            dedicated to helping developers learn and grow their skills.
          </p>
          <div className="social-links">
            <a
              href="https://github.com/Aniket2790"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aniket-tiwari-426448252/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            {/* <a
              href="https://www.youtube.com/channel/UCbGtkGZ9sDg54PtU3GEDE6w"
              target="_blank"
              rel="noopener noreferrer"
            >
              Youtube
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
