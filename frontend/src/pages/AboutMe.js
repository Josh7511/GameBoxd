import React from 'react';
import './AboutMe.css';
import NavBar from '../components/NavBar';
import github from '../assets/images/github.png';
import linkedin from '../assets/images/linkedin.png';
import email from '../assets/images/email.png';

function AboutMe() {
  return (
    <>
    <NavBar />
    <div className="about-container">
      <div className="about-card">
        <h1>About Me</h1>
        <p>
          Hi, I'm Josh Pereira — a passionate software engineering student with a love for building clean, usable web apps. I built GameBoxd to combine my interest in gaming with full-stack development. The goal was to create a Letterboxd-style experience for gamers — allowing users to log, review, and discover games.
        </p>
        <h2>Connect with me</h2>
        <ul className="contact-icons">
        <li>
         <a href="https://github.com/Josh7511" target="_blank" rel="noreferrer">
              <img src={github} alt="GitHub" />
          </a>
         </li>
         <li>
           <a href="https://www.linkedin.com/in/joshuapereira-software" target="_blank" rel="noreferrer">
             <img src={linkedin} alt="LinkedIn" />
            </a>
         </li>
         <li>
            <a href="mailto:jmp511@outlook.com">
             <img src={email} alt="Email" />
           </a>
         </li>
        </ul>

      </div>
    </div>
    </>
  );
}

export default AboutMe;
