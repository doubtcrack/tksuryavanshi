import React, { useState } from "react";

// import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import { images } from "../../constants";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client
      .create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="footer">
        {!isFormSubmitted ? (
          <div className="app__footer-form app__flex">
            <div>
              <img src={images.emailgif} alt="mail" />
            </div>
            <div>
              <h2 className="head-text">Take a coffee & chat with me</h2>
              <form onSubmit={handleSubmit}>
                <div className="app__flex">
                  <input
                    className="p-text"
                    type="text"
                    placeholder="Your Name"
                    name="username"
                    value={username}
                    required="required"
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="app__flex">
                  <input
                    className="p-text"
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={email}
                    onChange={handleChangeInput}
                  />
                </div>
                <div>
                  <textarea
                    className="p-text"
                    placeholder="Your Message"
                    value={message}
                    name="message"
                    onChange={handleChangeInput}
                  />
                </div>
                <button type="submit" className="p-text" onClick={handleSubmit}>
                  {!loading ? "Send Message" : "Sending..."}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="head-text">Thank you for getting in touch!</h3>
            <div className="ThankYou">
              <img
                src="https://cdn.sanity.io/images/k6jypiux/production/d97e84dbd0e24d709b44b308bfef644c27d3b7d2-500x500.gif"
                alt="Thank You Emoji"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__footerbg"
);
