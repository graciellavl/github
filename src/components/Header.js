import { Link } from "react-router-dom";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

const Header = ({}) => {
  const [text, setText] = useState("");

  return (
    <div className="container">
      <div className="header">
        <div className="left-header">
          <Link to="/">
            <FaGithub className="github-icon" size={30} />
          </Link>
          <div className="nav-content">
            <a> Why Github?</a>
          </div>

          <div className="nav-content">
            <a className="link" href="https://github.com/team">
              Team
            </a>
          </div>

          <div className="nav-content">
            <a className="link" href="https://github.com/enterprise">
              Enterprise
            </a>
          </div>

          <div className="nav-content">
            <a className="link" href="">
              Explore
            </a>
          </div>

          <div className="nav-content">
            <a className="link" href="https://github.com/marketplace">
              Marketplace
            </a>
          </div>

          <div className="nav-content">
            <a>Pricing</a>
          </div>
        </div>
        <div className="right-header">
          <input
            placeholder="Search Github"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <Link to={`/search/${text}`}>
            <button>/</button>
          </Link>
          <div className="nav-content">Sign In</div>
          <div className="nav-content">Sign Up</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
