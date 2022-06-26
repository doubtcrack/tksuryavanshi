import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { SiLeetcode } from "react-icons/si";

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <AiFillLinkedin />
    </div>
    <div>
      <AiFillGithub />
    </div>
    <div>
      <SiLeetcode />
    </div>
  </div>
);

export default SocialMedia;
