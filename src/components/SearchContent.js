import React from "react";
import LangBox from "../components/LangBox";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoRepo, GoStar } from "react-icons/go";
import { BsCircleFill } from "react-icons/bs";

const SearchContent = ({ match }) => {
  const [langs, setLangs] = useState([
    {
      index: 1,
      lang: "css",
      count: 1,
    },
    {
      index: 2,
      lang: "scss",
      count: 2,
    },
  ]);

  useEffect(() => {
    console.log(match);
    fetchRepo();
  }, [match.params.id]);

  const [display, setDisplay] = useState([]);

  const fetchRepo = () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      `https://api.github.com/search/repositories?q=${match.params.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {setDisplay(result.items)
    console.log(result.items)})
      .catch((error) => console.log("error", error));

    // console.log(display)
  };

  const timediff = (date) => {
    var currentTime  =  new Date()
    var updateTime = Date.parse(date)
    var time_diff = (currentTime - updateTime) / 1000

    console.log(time_diff);
    if (time_diff > 29030400) {
        return (Math.floor(time_diff/29030400)) + " years";
    } else if (time_diff > 2419200) {
        return (Math.floor(time_diff/2419200)) + " months";
    } else if (time_diff > 604800) {
        return (Math.floor(time_diff/604800)) + " weeks"; 
    } else if (time_diff > 86400) {
        return (Math.floor(time_diff/86400)) + " days";
    } else if (time_diff > 3600) {
        return (Math.floor(time_diff/3600)) + " hours";
    } else if (time_diff > 60) {
        return (Math.floor(time_diff/60)) + " minutes";
    } else {
        return (time_diff) + " seconds"
    }

  }

  return (
    <div>
      <div className="body main">
        <div className="lang-box">
          <LangBox langs={langs} />
        </div>
        <div className="search-content">
          <div className="lang-content search-content-top">
            <div>Result</div>
            <div>Sort</div>
          </div>
          <div>
            {display.map((content) => (
              <div key={content.id} className="content-containter">
                <GoRepo />
                <div>
                <Link to={`/${content.full_name}/${content.full_name}`}>
                  <div className="content-title">{content.full_name}</div>
                </Link>
                  <div className="desc">{content.description}</div>
                  <div className="attr-grup">
                    <div className="attribute"> <GoStar /> {content.stargazers_count} </div>
                    <div className="attribute"> <BsCircleFill />{content.language} </div>
                    {content.license ? <div className="attribute"> {content.license.name} </div> : ''}
                    <div className="attribute"> Updated {timediff(content.updated_at)} ago </div>
                    {content.open_issues !== 0 ? <div className="attribute"> {content.open_issues} issues need help</div> : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContent;
