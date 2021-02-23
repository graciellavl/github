import React from 'react'
import { useState, useEffect } from 'react'
import { GoRepo } from "react-icons/go";
import Tag from "../components/Tag";
import ReactMarkdown from "react-markdown";

const Details = ( {match} ) => {

    useEffect(() => {
        fetchRepo()
    }, [])

    const [display, setDisplay] = useState([])
    const [markdown, setMarkdown] = useState([])

    const fetchRepo = () => {
        var requestOptions = {
            method: 'GET',
          };
          
        fetch(`https://api.github.com/repos/${match.params.name}/${match.params.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {setDisplay(result)})
            .catch(error => console.log('error', error));

        fetch(`https://raw.githubusercontent.com/${match.params.name}/${match.params.id}/master/README.md`, requestOptions)
            .then(response => response.text())
            .then(result => {setMarkdown(result)})
            .catch(error => console.log('error', error));


        console.log("markdown", markdown)
    }

    return (
        <div >
            <div className="grey-background">
                <div className="repo-title">
                    <GoRepo className="repo-icon"/>
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
                        <div><b>About</b></div>
                        {display.description ?<div>{display.description}</div> : <div><em>No description, website, or topics provided.</em></div>}
                        <Tag url={display.full_name} />
                    </div>

                    <div className="item-box">
                        <div><b>Used by</b></div>
                        <div>user</div>
                    </div>
                    
                    <div className="item-box">
                        <div><b>Contributors</b></div>
                        <div>contributor</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Details
