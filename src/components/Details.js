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
  const [label, setLabel] = useState([]);
  const [markdown, setMarkdown] = useState();

  const fetchRepo = () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      `https://api.github.com/repos/${match.params.name}/${match.params.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setDisplay(result);
        fetchContent(result.default_branch);
        fetchLabel(result.full_name);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchContent = (default_branch) => {
    var requestOptions = {
      method: "GET",
    };

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

  const fetchLabel = (full_name) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "a274c49f8f2b915d87fcf573c096d80e0b3cded9"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`https://api.github.com/repos/${full_name}/tags`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLabel(result);
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
            {label.length !== 0 ? (
              <div className="chip-grup">
                {" "}
                {label.map((tag) => (
                  <div className="chip">{tag.name}</div>
                ))}{" "}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="item-box">
            <div>
              <b>Used by</b>
            </div>
            <div>user</div>
          </div>

          <div className="item-box">
            <div>
              <b>Contributors</b>
            </div>
            <div>contributor</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
