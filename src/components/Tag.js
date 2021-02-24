import React from 'react'
import { useState, useEffect } from "react";

const Tag = (  {url} ) => {

    useEffect(() => {
        fetchLabel();
      }, []);

    const [label, setLabel] = useState([])
    const fetchLabel = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "a274c49f8f2b915d87fcf573c096d80e0b3cded9");
      
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
