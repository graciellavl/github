import React from 'react'
import { useState, useEffect } from "react";

const Tag = (  {url} ) => {

    useEffect(() => {
        fetchLabel();
      }, []);

    const [label, setLabel] = useState([])
    const fetchLabel = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "0f526bf84bfcf6bcf7e27dd64d923396679731d2");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
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
