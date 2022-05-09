import React from 'react'
import Search from './Search'
import WhatsHappening from './WhatsHappening'
import WhoToFollow from './WhoToFollow'

export default function HomeRight() {
    return (
        <div className="container mt-2">
            <Search/>
            <WhatsHappening/>
            <WhoToFollow/>
        </div>
    )
}
