import React, { useEffect, useState } from "react";

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
  const [formError, setFormError] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(formvalidation(formData));
  };

  const formvalidation = (value) => {
    const errors = {};
    if (!value.email) {
      errors.email = "Please Enter Your Email";
    }
    // else{const error=document.getElementsByName("error");
  // error.classList.toggle("display_none")}
    try{
    if ((errors.email.length) !== 0) {
      setLoading(false);
    } 
  }
    catch{
      const contact = {
      _type: "contact",
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };
    
    setIsFormSubmitted(true);

    client
      .create(contact)
      .then(() => {
        setLoading(true);
      })};
    return errors;
  };

  // useEffect(() => {
  //   console.log(FormData);
  // }, [formError, formData, isFormSubmitted]);

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
                    name="name"
                    value={formData.name}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="app__flex email__flex">
                  <input
                    className="p-text"
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChangeInput}
                  />
                  <span className="error display_none">{formError.email}</span>
                </div>
                <div>
                  <textarea
                    className="p-text"
                    placeholder="Your Message"
                    value={formData.message}
                    name="message"
                    onChange={handleChangeInput}
                  />
                </div>
                <button className="p-text">
                  {loading ? "Sending..." : "Send Message"}
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
