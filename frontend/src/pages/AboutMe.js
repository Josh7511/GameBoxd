import React from 'react'
import NavBar from '../components/NavBar'
import github from '../assets/images/github.png'
import linkedin from '../assets/images/linkedin.png'
import email from '../assets/images/email.png'

export default function AboutMe() {
  return (
    <>
      <NavBar />
      <div className="bg-[#1e1e1e] text-[#e0e0e0] flex justify-center items-start py-16 px-4 min-h-screen">
        <div className="bg-[#2a2a2a] p-8 rounded-2xl max-w-xl w-full shadow-lg">
          <h1 className="text-[#8f5ed3] text-3xl font-bold mb-4">About Me</h1>
          <p className="text-base leading-relaxed">
            Hi, I’m Josh Pereira — a passionate software engineering student
            with a love for building clean, usable web apps. I built GameBoxd to
            combine my interest in gaming with full-stack development. The goal
            was to create a Letterboxd-style experience for gamers — allowing
            users to log, review, and discover games.
          </p>
          <h2 className="text-xl font-semibold text-[#e0e0e0] mt-8 mb-4">
            Connect with me
          </h2>
          <ul className="flex justify-center gap-6">
            <li>
              <a
                href="https://github.com/Josh7511"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={github}
                  alt="GitHub"
                  className="w-12 h-12 transform hover:scale-110 transition"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/joshuapereira-software"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={linkedin}
                  alt="LinkedIn"
                  className="w-12 h-12 transform hover:scale-110 transition"
                />
              </a>
            </li>
            <li>
              <a href="mailto:jmp511@outlook.com">
                <img
                  src={email}
                  alt="Email"
                  className="w-12 h-12 transform hover:scale-110 transition"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
