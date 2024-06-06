import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./ContactUs.css";
import { BiSolidUser, BiSolidMessageDetail } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import toast from "react-hot-toast";
function ContactForm() {
  const [state, handleSubmit] = useForm("xrgwqkaj");
  const [showPopup, setShowPopup] = useState(false);
  console.log(state);
  const handleOnSubmit = async (e) => {
    console.log("hi");

    e.preventDefault();
    if (validate()) {
      await handleSubmit(e);
      if (state.succeeded) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
      }
    }
  };

  function validate() {
    const errors = {};
    const input = document.getElementsByClassName("input-textarea");
    const textarea = document.getElementsByTagName("textarea");

    if (!input[0].value) {
      toast.error("Name is required");
      return;
    } else if (!/^[a-zA-Z\s]*$/.test(input[0].value)) {
      toast.error("Name should only contain alphabetic characters and spaces");
      return;
    }

    if (!input[1].value) {
      toast.error("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(input[1].value)) {
      toast.error("Invalid email format");
      return;
    }

    if (!input[2].value) {
      toast.error("Phone number is required");
      return;
    } else if (!/^\+91[0-9]{10}$/.test(input[2].value)) {
      toast.error("Invalid phone number format");
      return;
    }

    if (!input[3].value) {
      toast.error("Message is required");
      return;
    } else if (input[3].value.length < 25) {
      toast.error("Message Length should not be less than 25");
      return;
    }

    return errors; // Return the errors object
  }

  return (
    <div className="contactFormContainer">
      {showPopup ? (
        <div className="popup">
          <p>We will get back to you soon!</p>
        </div>
      ) : (
        <form className="form1" onSubmit={handleOnSubmit}>
          <h1 className="heading">Contact Us</h1>
          <label className="form-label" htmlFor="name">
            <BiSolidUser className="form-logo" />
            <p>Full Name</p>
          </label>
          <input className="input-textarea" id="name" type="text" name="name" />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
          <label className="form-label" htmlFor="email">
            <MdEmail className="form-logo" />
            Email Address
          </label>

          <input
            className="input-textarea"
            id="email"
            type="email"
            name="email"
            placeholder="email@email.com"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <label className="form-label" htmlFor="phone">
            <BsTelephoneFill className="form-logo" />
            Phone Number
          </label>

          <input
            className="input-textarea"
            id="phone"
            type="tel"
            name="phone"
            placeholder="+91 8928010092"
          />
          <ValidationError prefix="Phone" field="phone" errors={state.errors} />
          <label className="form-label" htmlFor="message">
            <BiSolidMessageDetail className="form-logo" />
            Message
          </label>

          <textarea
            className="input-textarea"
            id="message"
            name="message"
            placeholder="type a message"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          <button
            className="form-btn"
            type="submit"
            disabled={state.submitting}
          >
            {state.submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

function ContactUs() {
  return <ContactForm />;
}

export default ContactUs;
