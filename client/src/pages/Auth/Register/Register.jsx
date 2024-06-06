import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosFetch, generateImageURL } from "../../../utils";
import "./Register.css";
import emailjs from "@emailjs/browser";
const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    description: "",
    isSeller: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sendAutoReply = (username, password, toEmail) => {
    emailjs
      .send(
        "service_50snyqb",
        "template_21demwm",
        {
          to_email: toEmail,
          username: username,
          password: password,
        },
        "FpaG_7NuJG1_I6co_"
      )
      .then((result) => {
        console.log(result.text);
        if (result.status === 200) {
          console.log("Email sent successfully", result);
        } else {
          console.log("Email sending failed", result);
        }

        // Optionally show a success toast or message for the auto-reply
      })
      .catch((error) => {
        console.error(error.text);
        console.log("email sent failed");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (let key in formInput) {
      if (formInput[key] === "") {
        toast.error("Please fill all input field: " + key);
        return;
      } else if (key === "phone" && formInput[key].length < 9) {
        toast.error("Enter valid phone number!");
        return;
      } else if (key === "phone" && !/^\+91[0-9]{10}$/.test(formInput[key])) {
        toast.error(
          "Please enter a valid Indian mobile number (e.g., +919123456789 )."
        );
        return;
      } else if (
        !formInput["password"].match(
          /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{6,18}$/
        )
      ) {
        toast.error("Password must be 6 to 18 characters long and include at least one uppercase letter, one symbol (!@#$%^&*), one digit, and one lowercase letter: " );
        return;
      }
    }

    if (!image) {
      toast.error("Please upload a profile picture.");
      return;
    }

    setLoading(true);
    try {
      const { url } = await generateImageURL(image);
      console.log(url);
      const { data } = await axiosFetch.post("/auth/register", {
        ...formInput,
        image: url,
      });
      console.log(url);
      sendAutoReply(formInput.username, formInput.password, formInput.email);
      toast.success("Registration successful!");
      setLoading(false);

      navigate("/login");
    } catch ({ response }) {
      console.log(response);
      toast.error(response.data.message);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormInput({
      ...formInput,
      [name]: inputValue,
    });
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">
            Username <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />
          <label htmlFor="">
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <label htmlFor="">
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <input name="password" type="password" onChange={handleChange} />

          {/* <label htmlFor="">Profile Picture</label>
          <input
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
          /> */}

          <label className="imagesInput" htmlFor="profilePic">
            {image ? "Image Selected" : "Upload Profile Picture"}{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="profilePic"
            onChange={(event) => setImage(event.target.files[0])}
          />

          {/* <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button> */}
        </div>
        <div className="right">
          <p>
            Already have an account? <Link to="/login">Signin</Link>
          </p>
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" name="isSeller" onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">
            Phone Number <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="phone"
            type="text"
            placeholder="+91"
            onChange={handleChange}
          />
          <label htmlFor="">
            Description <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            placeholder="A short description of yourself"
            name="description"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
