import React from 'react'


export default function Search() {
    return (
        <div>
           <div className="input-group">
            <input className="form-control border-0 border rounded-pill" type="text" id="home-right-search" 
            style={{"backgroundColor": 'rgba(60, 64, 67, 0.1)', 'border': 'none', 'outline': 'none'}} placeholder="Search Otter"/>
         </div> 
        </div>
    )
}
