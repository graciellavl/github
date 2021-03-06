import React from 'react'
import { useState, useEffect } from "react";

const Tag = (  {url} ) => {

    useEffect(() => {
        fetchLabel();
      }, []);

    const [label, setLabel] = useState([])
    const fetchLabel = () => {
      var requestOptions = {
        method: "GET",
      };
    
        fetch(
          `https://api.github.com/repos/${url}/tags`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {setLabel(result)})
          .catch((error) => console.log("error", error));
      };

    return (
        <div>
            {label.length !== 0 ? <div className="chip-grup"> {label.map((tag) => (<div className="chip" key={tag.name}>{tag.name}</div>))} </div> : ''}
        </div>
    )
}

export default Tag
