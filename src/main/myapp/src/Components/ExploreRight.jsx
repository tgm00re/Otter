import React from 'react'
import Search from './Search'
import WhatsHappening from './WhatsHappening'
import WhoToFollow from './WhoToFollow'

export default function ExploreRight(props) {
    return (
        <div className="container mt-2">
            <WhoToFollow loggedInUser={props.loggedInUser}/>
        </div>
    )
}
