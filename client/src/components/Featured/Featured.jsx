import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Featured.css";

const Featured = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search) {
      // navigate(`/gigs?search=${search}`);
      navigate(`/gigs?category=${search}`);
    }
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h2 className="neonText">
            Where the world meets startups. Millions of small businesses use
            Freelancer to turn their ideas into reality
          </h2>
          <div className="search">
            <div className="searchInput">
              <img src="./media/search.png" alt="search" />
              <input
                type="search"
                placeholder='Try "website"'
                onChange={({ target: { value } }) => setSearch(value)}
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <Link to="/gigs?category=design">
              <button>Design</button>
            </Link>

            <Link to="/gigs?category=wordpress">
              <button>WordPress</button>
            </Link>
            <Link to="/gigs?category=voice">
              <button>Voice Over</button>
            </Link>
            <Link to="/gigs?category=ai">
              <button>AI Services</button>
            </Link>
          </div>
        </div>

        <div className="right"></div>
      </div>
    </div>
  );
};

export default Featured;
