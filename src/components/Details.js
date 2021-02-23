import React from 'react'
import { useState, useEffect } from 'react'


const Details = ( {match} ) => {

    useEffect(() => {
        // console.log(match)
        fetchRepo()
    }, [])

    const [display, setDisplay] = useState([])

    const fetchRepo = () => {
        var requestOptions = {
            method: 'GET',
          };
          
        fetch(`https://api.github.com/repos/${match.params.name}/${match.params.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {setDisplay(result)
            console.log(display)})
            .catch(error => console.log('error', error));

        console.log("display", display)
    }

    return (
        <div>
            <div>{display.full_name}</div>
        </div>
    )
}

export default Details
