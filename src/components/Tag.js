import React from 'react'
import { useState, useEffect } from "react";

const Tag = ({url}) => {

    useEffect(() => {
        fetchLabel();
      }, []);

    const [label, setLabel] = useState([])
    const fetchLabel = () => {
      var requestOptions = {
          method: "GET",
        };
    
        fetch(
          `https://api.github.com/repos/${url}/labels`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {setLabel(result)})
          .catch((error) => console.log("error", error));
      };

    return (
        <div>
            {label ? <div className="chip-grup"> {label.map((tag) => (<div className="chip">{tag.name}</div>))} </div> : ''}
        </div>
    )
}

export default Tag
