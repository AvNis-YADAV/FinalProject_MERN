import { useEffect } from "react";
import "./Footer.css";
import "bootstrap/dist/css/bootstrap.css";
import { BsTelephoneFill } from "react-icons/bs";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const linkStyle = { textDecoration: "none", color: "white" };

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <footer className="text-center footer text-center">
      <div
        style={{
          display: "flex",
          margin: "auto",
          padding: 35,
          justifyContent: "space-around",
        }}
        className="container p-4"
      >
        <div className="row  text-md-start mt-5">
          {/*Logo Start*/}
          <div className="col-md-3 ">
            <h5 className="pb-3">About Us</h5>
            <p className="copy-right">
              {" "}
              GigFindr is a leading platform that connects talented freelancers
              with clients seeking professional services.
            </p>
          </div>
          {/*Logo end*/}
          {/*Solutions Start*/}
          <div className="col-md-3 quick-links">
            <h5 className="pb-3"> Quick links </h5>
            <ul className="list-style ps-0 ">
              <li className="pb-3">
                <LiaExternalLinkAltSolid className="footer-links" />
                <Link style={linkStyle} to="/gigs?category=ai">
                  AI
                </Link>
              </li>
              <li className="pb-3">
                <LiaExternalLinkAltSolid className="footer-links" />
                <Link style={linkStyle} to="/gigs?category=seo">
                  SEO
                </Link>
              </li>
              <li className="pb-3">
                <LiaExternalLinkAltSolid className="footer-links" />
                <Link style={linkStyle} to="/gigs?category=illustration">
                  Illustration
                </Link>
              </li>
            </ul>
          </div>
          {/*Solutions end*/}
          {/*Quick links Start*/}
          <div className="col-md-3 quick-links">
            <h5 className="pb-3"> Quick links </h5>
            <ul className="list-style ps-0">
              <li className="pb-3">
                <LiaExternalLinkAltSolid className="footer-links" />
                <Link style={linkStyle} to="/gigs?category=voice">
                  Voice Over
                </Link>
              </li>
              <li className="pb-3">
                <LiaExternalLinkAltSolid className="footer-links" />
                <Link style={linkStyle} to="/gigs?category=design">
                  Design
                </Link>
              </li>
              <li className="pb-3">
                <LiaExternalLinkAltSolid className="footer-links" />
                <Link style={linkStyle} to="/gigs?category=wordpress">
                  Wordpress
                </Link>
              </li>
            </ul>
          </div>
          {/*QUick links end*/}
          {/*Other Start*/}
          <div className="col-md-3 ">
            <h5 className="pb-3"> Contact Us </h5>
            <p className="copy-right">CDAC Mumbai , Kharghar , Navi Mumbai .</p>
            <p className="copy-right">
              <BsTelephoneFill className="phone" />
              8928010292
            </p>
          </div>
          {/*Other end*/}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
