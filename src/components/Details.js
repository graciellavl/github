import React from "react";
import { useState, useEffect } from "react";
import { GoRepo } from "react-icons/go";
import Tag from "../components/Tag";
import ReactMarkdown from "react-markdown";

const Details = ({ match }) => {
  useEffect(() => {
    fetchRepo();
  }, []);

  const [display, setDisplay] = useState([]);
  const [user, setUser] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [markdown, setMarkdown] = useState();
  const [contents, setContents] = useState([]);

  var requestOptions = {
    method: "GET",
  };
  const fetchRepo = () => {
    fetch(
      `https://api.github.com/repos/${match.params.name}/${match.params.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setDisplay(result);
        fetchContent(result.default_branch);
        fetchUser(result.full_name);
        fetchContributor(result.full_name);
        fetchContents(result.full_name);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchContent = (default_branch) => {
    fetch(
      `https://raw.githubusercontent.com/${match.params.name}/${match.params.id}/${default_branch}/README.md`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setMarkdown(result);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchUser = (full_name) => {
    fetch(`https://api.github.com/repos/${full_name}/assignees`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUser(result);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchContributor = (full_name) => {
    fetch(
      `https://api.github.com/repos/${full_name}/contributors`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setContributors(result);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchContents = (full_name) => {
    fetch(`https://api.github.com/repos/${full_name}/contents`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setContents(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <div className="grey-background">
        <div className="repo-title">
          <GoRepo className="repo-icon" />
          <div className="title-blue title">{display.full_name}</div>
        </div>
      </div>
      <div className="body main flex-between">
        <div className="">
          {contents.map((content) => (
            <a key={content.sha} href={content.html_url}>
              {content.name}
            </a>
          ))}
        </div>
        <div className="md-style">
          <div>README.md</div>
          <ReactMarkdown source={markdown} />
        </div>
        <div className="right-content">
          <div className="item-box">
            <div>
              <b>About</b>
            </div>
            {display.description ? (
              <div>{display.description}</div>
            ) : (
              <div>
                <em>No description, website, or topics provided.</em>
              </div>
            )}
          </div>

          <div className="item-box">
            <div>
              <b>Used by</b>
            </div>
            <div className="user">
              {user.map((user) => (
                <a key={user.id} href={user.html_url}>
                  <img src={user.avatar_url} className="user-icon" />
                </a>
              ))}
            </div>
          </div>

          <div className="item-box">
            <div>
              <b>Contributors</b>
            </div>
            <div className="user">
              {contributors.map((contributors) => (
                <a key={contributors.id} href={contributors.html_url}>
                  <img src={contributors.avatar_url} className="user-icon" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
