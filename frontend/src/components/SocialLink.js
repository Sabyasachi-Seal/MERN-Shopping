import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faLinkedin,
    faGooglePlusG,
    faRavelry
  } from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow() {
  return (
    <div className="main-footer">
    <div className="container">

      <div className="row">

      <p className="socail_icons">
      <a href="https://github.com/Sabyasachi-Seal/MERN-Shopping" className="github social" target="_blank"  rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>

      <a href="https://www.linkedin.com/in/sabyasachi-seal-4461711bb/" className="linkedin social" target="_blank"  rel="noreferrer">
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>

      <a href="mailto:iam.sabyasachi.seal@gmail.com" className="google social" target="_blank"  rel="noreferrer">
      <FontAwesomeIcon icon={faGooglePlusG} size="2x" />
      </a>

      <a href="https://sabyasachi-seal.github.io" className="portfolio social" target="_blank"  rel="noreferrer">
      <FontAwesomeIcon icon={faRavelry} size="2x" />
      </a>
      </p>  

        <p className="col-sm">
          &copy;{new Date().getFullYear()} <a href="https://sabyasachi-seal.github.io" className="footer_name social" target="_blank" >Seal, Nikita, Nandi, Anuran, Arijit</a> 
          Made with ❤️ and care....
        </p>
        
      </div>
    </div>
  </div>

  );
}