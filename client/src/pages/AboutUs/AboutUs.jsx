import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About GigFindr</h1>
      <div className="about-section">
        <p>
          GigFindr is a leading platform that connects talented freelancers with
          clients seeking professional services. From web development and
          graphic design to content writing and digital marketing, GigFindr
          provides a wide array of services to cater to your business needs.
        </p>
        <p>
          Our platform is designed with simplicity and efficiency in mind,
          allowing clients to easily browse through our extensive network of
          skilled freelancers, review portfolios, and make informed hiring
          decisions. With GigFindr, you can find the perfect expert for your
          project in no time.
        </p>
        <p>
          For freelancers, GigFindr offers a vibrant community and a seamless
          way to showcase your talents and connect with potential clients. We
          ensure a safe and transparent process, making it easier for you to
          focus on what you do best - delivering outstanding work.
        </p>
        <p>
          Our mission is to revolutionize the way businesses and freelancers
          collaborate, creating a trustworthy and efficient environment that
          fosters creativity, innovation, and growth. Join us today and discover
          a world of opportunities with GigFindr.
        </p>
      </div>
      <h2>Meet Our Exceptional Team:</h2>
      <div className="developers">
        {[
          "Aniket Patil",
          "Saurabh Sawant",
          "Vaibhav Yergude",
          "Avnish Yadav",
          "Dhanaashree Chavan",
        ].map((name, index) => (
          <div className="developer" key={index}>
            <div className="image-container">
              <div className="image-flip">
                <img
                  className="image-front"
                  src={`media/image${index + 1}.jpg`}
                  alt={`Developer ${index + 1}`}
                />
                <div className="image-back">Developer {index + 1}</div>
              </div>
            </div>
            <h3>{name}</h3>
            <p>
              {
                [
                  "Frontend Developer",
                  "Full-Stack Developer",
                  "Backend Developer",
                  "UI/UX Designer",
                  "Database Designer",
                ][index]
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
